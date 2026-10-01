# Kadakareer — Product

Product management workspace for Kadakareer: epics, tickets, prototypes, Asana workspace context, and standing docs/skills for working with Claude on product work.

## About Kadakareer

Kadakareer is volunteer-run, focused on the economic and digital career growth of underserved Filipino students.

Its programs include a Virtual Apprenticeship. 
- `kadakareer.com` is the org site
- `app.kadakareer.com` hosts the live platform 

## Deploys

The site is served by GitHub Pages from a workflow, not from a branch setting.

| Branch | Served at |
|---|---|
| `main` | Site root |
| `feature/<name>` | `/preview/<name>/` |

- The preview index lists every live feature branch, newest first
- Previews are marked noindex and show a branch banner
- Pushing a feature branch redeploys the whole site. Deleting one removes its preview.
- Only `main` may deploy, so a feature push asks `main`'s copy of the workflow to run
- A feature branch triggers deploys only if it contains the workflow file. Branch off `main` after it lands.
- Site files are everything at the repo root except docs, context and tooling folders

### One-time setup

Switch the Pages source to GitHub Actions:

```
gh api -X PUT repos/kadakareer/product/pages -f build_type=workflow
```

Until then, deploys fail with a Pages source error.

### Reference

| What | Where |
|---|---|
| Workflow | `.github/workflows/pages.yml` |
| Site assembly | `.github/scripts/assemble-site.sh` |
