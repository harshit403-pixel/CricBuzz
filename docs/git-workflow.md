> Note: This document is an initial planning draft prepared during the early stage of the project. It can be updated based on team discussion, mentor instructions, and official task assignments.

# Git Workflow Draft

## Team Workflow Direction

- The `main` branch should stay stable
- Every member should work on their own branch
- Members should pull the latest `main` before starting new work
- Members should avoid direct push to `main`
- Feature work should be committed with clear and meaningful messages
- A Pull Request should be raised after work is ready
- The team leader or reviewer can review PRs and merge approved work

This follows the team workflow where members work on separate branches and raise PRs for review before code is merged.

## Suggested Working Steps

1. Move to the latest `main`
2. Pull recent changes
3. Create or switch to your working branch
4. Make focused changes
5. Check files before commit
6. Commit with a clear message
7. Push your branch
8. Raise a Pull Request for review

## Example Commands

```bash
git checkout main
git pull origin main
git checkout -b divyansh
git status
git add docs
git commit -m "docs: add initial project planning"
git push origin divyansh
```

## Reminder

This workflow is a simple starting point for team collaboration. It can be adjusted after team discussion, mentor instructions, and official task assignments.
