#!/usr/bin/env bash
# Builds _site/: main at the root, each origin/feature/* branch under
# preview/<name>/, plus a preview/index.html listing the live previews.
# Needs a full clone (fetch-depth 0) so every remote branch ref exists.
set -euo pipefail

OUT=_site

# Repo files that aren't part of the site.
NOT_SITE=(.github .claude .gitignore CLAUDE.md README.md context)

esc() {
  sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/"/\&quot;/g'
}

export_ref() {
  local ref="$1" dest="$2" p
  mkdir -p "$dest"
  git archive "$ref" | tar -x -C "$dest"
  for p in "${NOT_SITE[@]}"; do
    rm -rf "${dest:?}/$p"
  done
}

# Keeps previews out of search results and makes them obvious on screen.
mark_preview() {
  local dest="$1" branch="$2" file
  export META='<meta name="robots" content="noindex">'
  BANNER="<div style=\"position:fixed;bottom:8px;left:8px;z-index:2147483647;padding:5px 9px;border-radius:6px;background:#111;color:#fff;font:600 12px/1.2 system-ui,sans-serif;opacity:.88;pointer-events:none\">Preview &middot; $(printf '%s' "$branch" | esc)</div>"
  export BANNER
  while IFS= read -r -d '' file; do
    perl -0pi -e 's/(<head(?:\s[^>]*)?>)/$1$ENV{META}/i; s/(<body(?:\s[^>]*)?>)/$1$ENV{BANNER}/i' "$file"
  done < <(find "$dest" -name '*.html' -print0)
}

rm -rf "$OUT"
export_ref origin/main "$OUT"

mkdir -p "$OUT/preview"
rows=""
count=0

while IFS= read -r ref; do
  branch="${ref#origin/}"
  slug="$(printf '%s' "${branch#feature/}" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9._-]+/-/g; s/^-+|-+$//g')"
  [ -n "$slug" ] || continue

  base="$slug"
  n=2
  while [ -e "$OUT/preview/$slug" ]; do
    slug="$base-$n"
    n=$((n + 1))
  done

  export_ref "$ref" "$OUT/preview/$slug"
  mark_preview "$OUT/preview/$slug" "$branch"

  info="$(git log -1 --format='%cs  %s' "$ref" | esc)"
  rows+="<li><a href=\"$slug/\">$(printf '%s' "$branch" | esc)</a><span>$info</span></li>"$'\n'
  count=$((count + 1))
  echo "preview: $branch -> preview/$slug/"
done < <(git for-each-ref --sort=-committerdate --format='%(refname:short)' refs/remotes/origin/feature/)

[ -n "$rows" ] || rows='<li class="none">No feature branches are deployed.</li>'

cat > "$OUT/preview/index.html" <<HTML
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Previews</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 15px/1.5 system-ui, sans-serif; max-width: 640px; margin: 48px auto; padding: 0 16px; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  p { margin: 0 0 24px; opacity: .7; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { padding: 10px 0; border-top: 1px solid rgba(128,128,128,.3); display: flex; flex-direction: column; gap: 2px; }
  li span { font-size: 13px; opacity: .65; }
  li.none { opacity: .65; }
</style>
</head>
<body>
<h1>Previews</h1>
<p>Feature branches, newest first. <a href="../">Main site</a></p>
<ul>
$rows</ul>
</body>
</html>
HTML

echo "built $OUT: main + $count preview(s)"
