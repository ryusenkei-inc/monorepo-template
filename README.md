# monorepo-template

A starting point for RYUSENKEI monorepos. It includes the shared conventions (writing style, comments, commits, secrets), style checks, CI, and tool versions.

## Structure

| Path | Purpose | Depends on |
| --- | --- | --- |
| `apps/*` | Applications | `packages/*` |
| `packages/*` | Code shared within this repository | — |
| `scripts/` | Repository operations, such as managing `.env` | — |

Code shared across repositories lives in [toolkit](https://github.com/ryusenkei-inc/toolkit) and is installed from npm. This template is the minimal base for any repository, so it holds no product code; a product adds its apps, infrastructure, contact forms, and legal pages on top.

## Commands

```sh
pnpm lint                      # type check, prose-lint, and shared-file check
pnpm lint:prose [paths...]     # prose-lint only (code comments and tracked Markdown)
npx ryusenkei-conventions sync # write the shared files from @ryusenkei/conventions
pnpm lint:prose --fix          # fix spacing and trailing-comment alignment in code comments
pnpm test                      # tests
node scripts/env.ts run <cmd>  # run a command with .env loaded
pnpm env:push [--dry-run]      # push .env values to GitHub Variables / Secrets
pnpm repo:settings             # apply GitHub repository settings (ryusenkei-repo-settings)
```

- Style rules and settings: [`@ryusenkei/prose-lint`](https://www.npmjs.com/package/@ryusenkei/prose-lint). Add `prose-lint.json` to the root only to change the defaults.
- Commit messages are checked by `.githooks/commit-msg`, and `.githooks/pre-push` runs the `check` script if one is defined. Both are enabled by `prepare` on `pnpm install`.
- `env:push` targets are defined in `targets` in `scripts/env.ts`. The CLI itself is `envCli` from [`@ryusenkei/scripts`](https://www.npmjs.com/package/@ryusenkei/scripts).

## Tooling

| File | Purpose |
| --- | --- |
| [`@ryusenkei/conventions`](https://www.npmjs.com/package/@ryusenkei/conventions) | Shared rules imported by `CLAUDE.md`, Claude Code hooks that enforce the conventions, and master copies of the files below (except the workflows). Run `npx ryusenkei-conventions sync` after an update |
| `mise.toml` | Node.js and Terraform versions (pnpm is pinned by `packageManager` in `package.json`) |
| `.github/workflows/ci.yaml` | Calls toolkit's reusable CI (typecheck, test, prose lint, PR title, secret scan) on pull requests to `main` only (no run on pushes to `main`, to save Actions minutes on private repositories). The PR title becomes the squash commit message |
| `.github/workflows/pr-title.yaml` | Calls toolkit's reusable workflow that re-checks only the PR title when it is edited, without installing dependencies |
| `.github/dependabot.yaml` | Monthly update PRs for npm and GitHub Actions (minor and patch grouped, no automatic rebase). `gomod` and `cargo` entries are added when `go.mod` or `Cargo.toml` exists at the root |
| `.gitleaks.toml` | Secret scan settings |
| `.claude/settings.json` | Claude Code hooks (`@ryusenkei/conventions` and `prose-lint --hook`), `attribution`, and `permissions.deny` |
| `.editorconfig`, `.gitattributes` | Encoding, indentation, and LF line endings |

## Creating a repository from this template

This repository is a GitHub template. Click **Use this template** on GitHub, or run:

```sh
gh repo create ryusenkei-inc/<name> --template ryusenkei-inc/monorepo-template --private --clone
```

Then in the new repository:

1. Update `name` in `package.json` (it is still `@ryusenkei/monorepo-template`) and the opening lines of `README.md` and `CLAUDE.md`.
2. Set `targets` in `scripts/env.ts` and `.env.example`. The scripts resolve the repository from the git remote, so there is no repository name to set.
3. Run `mise install`, `pnpm install`, `pnpm lint`, and `pnpm test`.
4. Run `pnpm repo:settings` to apply the GitHub settings that a template doesn't copy: squash merge (plus merge commits with the epic flow), the PR title as the commit message with an empty body, and branch deletion after merge.
