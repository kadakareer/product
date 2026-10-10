#!/usr/bin/env python3
"""Copies each ticket's dates into the table in tickets/index.html.

The source of truth is two meta tags in each ticket's <head>:
  <meta name="ticket-created" content="YYYY-MM-DD">
  <meta name="ticket-updated" content="YYYY-MM-DD">
Edit those by hand (bump "updated" when a ticket's content changes), then run:
  python3 .github/scripts/sync-ticket-dates.py
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[2]
index = root / "tickets" / "index.html"
html = index.read_text()
problems = []


def meta(text, name):
    m = re.search(r'<meta name="%s" content="(\d{4}-\d{2}-\d{2})">' % name, text)
    return m.group(1) if m else None


pattern = re.compile(r'<tr((?: data-[a-z]+="[^"]*")*)><td class="num">(\d+)</td><td><a href="([^"]+)"([^\n]*)')
def rebuild(m):
    attrs, num, href, rest = m.group(1), m.group(2), m.group(3), m.group(4)
    page = root / "tickets" / href
    text = page.read_text()
    created, updated = meta(text, "ticket-created"), meta(text, "ticket-updated")
    if not created or not updated:
        problems.append("%s is missing ticket-created or ticket-updated" % href)
        return m.group(0)
    attrs = re.sub(r' data-(created|updated)="[^"]*"', "", attrs)
    return '<tr%s data-created="%s" data-updated="%s"><td class="num">%s</td><td><a href="%s"%s' % (
        attrs, created, updated, num, href, rest)

new = pattern.sub(rebuild, html)
for page in sorted((root / "tickets").glob("*/*.html")):
    rel = page.relative_to(root / "tickets").as_posix()
    if 'href="%s"' % rel not in new:
        problems.append("%s is not listed in tickets/index.html" % rel)
if problems:
    print("\n".join(problems))
    sys.exit(1)
index.write_text(new)
print("synced dates for %d tickets" % len(pattern.findall(html)))
