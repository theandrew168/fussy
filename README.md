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

## Deployment

Since this is a NodeJS app, you can't really bundle / build it into a clean, single binary for deployment (like I do with Go).
Given that, what needs to happen?
I still want to use systemd.
The server will need to have NodeJS installed to run the app.
Prior to starting, we need to run both `npm install` and `npm run build`.
Actually running the app will run `npm run start`.

Naively, this approach has issues.
Once the app is running, how can a new version of the code be deployed, built, and started **without impacting the currently running app**?
This problem also exists for other non-single-binary ecosystems such as Python.
There, tools like [shiv](https://shiv.readthedocs.io/en/latest/) solve the problem by transparently unzipping the app into a unique directory prior to running.
That way, the individual files of different versions don't conflict with each other and cutover race condition are avoided.

Can we do something similar?
Systemd doesn't have a native way to say "use this arbitrary  working directory (controlled via a variable, maybe?)".
One possible solution to this that I really like is simply making the `WorkingDirectory` a symlink ([reference](https://unix.stackexchange.com/a/629958)).
Then, that symlink can point to any given revision of the project available on the server.

How would deployments work using this approach?
We'd first have a separate directory for each revision of the app that has been deployed (`/usr/local/bin/fussy/384a283` for example).
There will then exist a symlink (like named `/usr/local/bin/fussy/current`) that points to whichever version of the app is currently active.

When deploying a new version, checkout / clone its code into a revision directory that correponds to its commit hash.
Then, from this new revision directory, run both of the "build" steps: `npm install` and `npm run build`.
Next, update the "current" symlink to point to the new revision directly.
Lastly, restart the systemd service which will pick up the code from the new revision.