# fussy

Helping tech writers avoid fussy developers

## Concept

Often, tech writers are blocked and frustrated by developers who won't take the time to help non-developers understand their changes.
Instead of waiting for developers to answer the writer's questions, let LLMs help them summarize the raw materials: tickets, diffs, etc.
To that end, this is an application for helping tech writers summarize Jira tickets, GitHub PRs, and similar software-related content.

## Workflow

1. A "user" registers on the site (OAuth?)
2. They start by adding at least one "integration" (GitHub, Jira, etc)
3. The "user" can a new "feature"
   1. This is something has been added / changed with the application and needs documentation
4. Users can add "context" to a "feature" in many ways:
   1. Manually by the writer (notes)
   2. With a VCS "integration" (PRs, commits, etc)
   3. With a Project "integration" (epics, stories, tasks, etc)
5. With "context" gathered about the "feature", the user can:
   1. Summarize the "feature" in human-readable terms
   2. Generate a script for recording a demo about the "feature"

## VCS Integrations

1. GitHub
2. GitLab (future)
3. BitBucket (future)
4. Azure Repos (future)

## Project Integrations:

1. Jira (future)
2. Trello (future)
3. Asana (future)
4. Azure Dev Ops (future)
