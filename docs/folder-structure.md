> Note: This document is an initial planning draft prepared during the early stage of the project. It can be updated based on team discussion, mentor instructions, and official task assignments.

# Proposed Folder Structure

## Purpose

This is a suggested scalable folder structure for future development. It is meant to help the team think ahead, but it should not force changes before team approval.

## Possible Client Structure

```text
Client/
  components/
  pages/ or app/
  services/
  hooks/
  utils/
  data/
  styles/
```

### Suggested Meaning

- `components/` for reusable UI parts
- `pages/` or `app/` for route-level screens based on the chosen frontend setup
- `services/` for API calls and related request logic
- `hooks/` for reusable frontend logic
- `utils/` for helper functions
- `data/` for static data, mock data, or constants
- `styles/` for shared styling files

## Possible Server Structure

```text
Server/src/
  config/
  controllers/
  routes/
  models/
  middlewares/
  services/
  validators/
  sockets/
  utils/
```

### Suggested Meaning

- `config/` for environment and project configuration
- `controllers/` for request handlers
- `routes/` for API route definitions
- `models/` for database-related models
- `middlewares/` for reusable request-processing logic
- `services/` for business logic
- `validators/` for input validation rules
- `sockets/` for real-time update handling if used
- `utils/` for helper functions shared across the server

## Why This Helps

A planned structure helps the team place code in predictable locations. This can reduce confusion, make onboarding easier, and lower the chance of multiple people changing the same files unnecessarily.

## Merge Conflict Benefit

When responsibilities are split across clear folders, team members are less likely to work in the exact same files at the same time. That can help reduce merge conflicts and make pull request reviews simpler.

## Final Note

This is a proposed structure only. The team can update it after discussion, mentor instructions, and official task assignments instead of treating it as a fixed rule from the beginning.
