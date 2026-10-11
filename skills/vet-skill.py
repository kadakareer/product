#!/usr/bin/env python3
"""Mechanical pre-install checks for a Claude skill on GitHub. Read-only.

    python3 skills/vet-skill.py <owner/repo | GitHub URL> [folder-in-repo]

Needs the GitHub CLI (`gh`), signed in. It only reads from the GitHub API: it never
clones, installs or runs anything from the target. It covers the checks a script can
do (source, code that runs, risky patterns). Reading SKILL.md and deciding is still yours.
"""
import base64
import json
import re
import subprocess
import sys
from datetime import datetime, timezone

SCRIPT_EXT = (".sh", ".bash", ".zsh", ".py", ".js", ".mjs", ".cjs", ".ts", ".rb", ".ps1", ".pl")
TEXT_CAP = 200_000
FILE_CAP = 12
SHOW = 3

# (label, regex). One finding per label and file, first few lines shown.
PATTERNS = {
    "Reaches the network": r"\b(curl|wget|WebFetch|WebSearch|fetch\(|requests\.(get|post)|urllib|http\.client|axios|scrap\w*|web\s?(pages?|sites?)|browse|app\s+store|pricing\s+pages?)\b",
    "Runs commands or deletes": r"\b(rm\s+-rf|sudo|chmod\s+7|eval\(|exec\(|os\.system|subprocess|child_process|shutil\.rmtree)\b",
    "Installs things": r"\b(npx\s|npm\s+(i|install)\b|pip\s+install|brew\s+install|curl[^|\n]*\|\s*(ba)?sh)",
    "Writes, pushes or publishes": r"(git\s+push|gh\s+(pr|issue|release)\s+(create|edit|merge)|--force\b|gh\s+api\s+-X)",
    "Reads secrets or env": r"(\.env\b|API_KEY|SECRET|TOKEN|~/\.ssh|credentials)",
    "Injection-style wording": r"(ignore\s+(all\s+|any\s+)?(previous|prior|above)\s+instructions|do\s+not\s+(tell|mention|inform)\s+the\s+user|without\s+(telling|asking)\s+the\s+user|exfiltrat|<!--)",
}
INVISIBLE = re.compile("[​-‏⁠⁦-⁩﻿\U000e0000-\U000e007f]")
RISKY_FILES = re.compile(r"(^|/)(hooks?/|settings(\.local)?\.json$|hooks\.json$|\.claude-plugin/|install[^/]*$|setup[^/]*\.sh$|Makefile$)", re.I)

warns = 0
ICON = {"+": "✔", "!": "⚠", "-": "·"}


def gh(*args, raw=False):
    cmd = ["gh", "api"] + (["-H", "Accept: application/vnd.github.raw"] if raw else []) + list(args)
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip() or "gh api failed")
    return r.stdout if raw else json.loads(r.stdout)


def say(mark, text):
    global warns
    if mark == "!":
        warns += 1
    print(f"  {ICON[mark]} {text}")


def parse_target(args):
    t = args[0].strip().rstrip("/")
    t = re.sub(r"^https?://github\.com/", "", t)
    t = re.sub(r"\.git$", "", t)
    m = re.match(r"^([^/]+)/([^/]+)(?:/(?:tree|blob)/[^/]+/(.+))?$", t)
    if not m:
        sys.exit("Give a target like owner/repo or a github.com link.")
    owner, repo, path = m.group(1), m.group(2), m.group(3) or ""
    if len(args) > 1:
        path = args[1].strip("/")
    return owner, repo, path.strip("/")


def plural(n):
    return f"{n} day" + ("" if n == 1 else "s")


def days_ago(iso):
    return (datetime.now(timezone.utc) - datetime.fromisoformat(iso.replace("Z", "+00:00"))).days


def scan(label_path, text):
    found = []
    lines = text.splitlines()
    for label, rx in PATTERNS.items():
        hits = [(i + 1, l.strip()[:110]) for i, l in enumerate(lines) if re.search(rx, l, re.I)]
        if hits:
            found.append((label, hits))
    if INVISIBLE.search(text):
        found.append(("Invisible characters", [(0, "zero-width or direction-control characters present")]))
    if re.search(r"[A-Za-z0-9+/]{200,}={0,2}", text):
        found.append(("Long encoded blob", [(0, "a 200+ character base64-like string")]))
    return found


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    try:
        subprocess.run(["gh", "--version"], capture_output=True, check=True)
    except Exception:
        sys.exit("This needs the GitHub CLI (gh), signed in.")
    owner, repo, path = parse_target(sys.argv[1:])
    full = f"{owner}/{repo}"
    try:
        info = gh(f"repos/{full}")
    except RuntimeError as e:
        sys.exit(f"Could not read {full}: {e}")
    branch = info["default_branch"]
    scope = f"{full}/{path}" if path else full
    print(f"\nVetting {scope}  (read-only, nothing installed or run)\n")

    # 1. Where is it from?
    print("1. Where is it from?")
    stars = info["stargazers_count"]
    official = info["owner"]["type"] == "Organization"
    age, since_push = days_ago(info["created_at"]), days_ago(info["pushed_at"])
    say("-", f"Owner: {owner} ({info['owner']['type']}). Created {info['created_at'][:10]} ({plural(age)} ago). Last push {info['pushed_at'][:10]} ({plural(since_push)} ago).")
    say("-", f"{stars:,} stars, {info['forks_count']:,} forks, {info['open_issues_count']:,} open issues.")
    if stars < 1000 and not official:
        say("!", "Small repo from a single account (under 1,000 stars). Read it line by line.")
    if age < 90:
        say("!", "Repo is under 90 days old.")
    if since_push > 180:
        say("!", "No push in over 6 months. May be stale.")
    if info.get("archived"):
        say("!", "Archived.")
    if info.get("fork"):
        say("!", f"Is a fork of {info['parent']['full_name']}. Check the original instead.")

    # 6. License
    lic = (info.get("license") or {}).get("spdx_id")
    print("\n6. License")
    if not lic or lic == "NOASSERTION":
        say("!", "No license detected by GitHub. Read the README or LICENSE before using at work.")
    else:
        say("+", f"{lic}.")

    # Tree
    sha = gh(f"repos/{full}/commits/{branch}")["sha"]
    tree = gh(f"repos/{full}/git/trees/{branch}?recursive=1")
    blobs = [t for t in tree["tree"] if t["type"] == "blob"]
    in_scope = [t for t in blobs if not path or t["path"].startswith(path + "/") or t["path"] == path]
    if path and not in_scope:
        sys.exit(f"No files under '{path}' in {full}.")

    # 2. Does it run code?
    print("\n2. Does it run code?")
    if tree.get("truncated"):
        say("!", "Repo is too large for GitHub to list in full; counts below are partial.")
    scripts = [t for t in in_scope if t["path"].lower().endswith(SCRIPT_EXT)]
    execs = [t for t in in_scope if t.get("mode") == "100755" and t not in scripts]
    risky = [t for t in blobs if RISKY_FILES.search(t["path"])]
    risky_in = [t for t in risky if not path or t["path"].startswith(path + "/")]
    say("-", f"{len(in_scope):,} files in scope, {sum(1 for t in in_scope if t['path'].endswith('.md')):,} markdown.")
    if scripts or execs:
        say("!", f"{len(scripts) + len(execs)} script or executable files in scope:")
        for t in (scripts + execs)[:8]:
            print(f"      {t['path']}")
        if len(scripts) + len(execs) > 8:
            print(f"      ... and {len(scripts) + len(execs) - 8} more")
    else:
        say("+", "Markdown only in scope. Nothing here runs by itself.")
    if risky_in:
        say("!", "Hooks, settings, plugin or install files in scope:")
        for t in risky_in[:8]:
            print(f"      {t['path']}")
    outside = [t for t in risky if t not in risky_in]
    if path and outside:
        say("!", f"Elsewhere in the repo: {len(outside)} hooks, settings or install files (e.g. {outside[0]['path']}). Copy only the folder; don't plugin-install the repo.")
    elif not risky:
        say("+", "No hooks, settings or install files found.")

    # 4/5. Patterns in the text a skill is made of
    print("\n4/5. What does it read, and what can it change? (keyword scan, not a review)")
    targets = [t for t in in_scope if t["path"].endswith("SKILL.md")] + scripts
    targets = [t for t in targets if t.get("size", 0) <= TEXT_CAP][:FILE_CAP]
    if not targets:
        say("-", "No SKILL.md or script files to scan in scope.")
    any_found = False
    for t in targets:
        try:
            text = gh(f"repos/{full}/contents/{t['path']}?ref={sha}", raw=True)
        except RuntimeError:
            say("-", f"Could not read {t['path']}.")
            continue
        for label, hits in scan(t["path"], text):
            any_found = True
            say("!", f"{label} in {t['path']}:")
            for ln, snip in hits[:SHOW]:
                print(f"      {'line ' + str(ln) + ': ' if ln else ''}{snip}")
            if len(hits) > SHOW:
                print(f"      ... and {len(hits) - SHOW} more")
    if targets and not any_found:
        say("+", f"No flagged patterns in {len(targets)} file(s) scanned.")
    if len([t for t in in_scope if t["path"].endswith("SKILL.md")] + scripts) > FILE_CAP:
        say("-", f"Scanned the first {FILE_CAP} files only.")

    # 7. Pin
    print("\n7. Pin it")
    say("-", f"Latest commit on {branch}: {sha}")
    say("-", "Copy the folder as of this commit instead of plugin-installing, so later upstream edits don't change what you run.")

    print(f"\nResult: {warns} warning(s). This covers what a script can check. Read SKILL.md yourself before installing.\n")


if __name__ == "__main__":
    main()
