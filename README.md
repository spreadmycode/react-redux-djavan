# Djavan - Rhino Security Assessment and Reporting Tool

For project structure see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

### Requirements

- NodeJS 8+
- NPM 5+

### Install and run the app

- Install deps with `npm install`
- Run development server with `npm run dev`
- Open http://localhost:6001 (port is specified via `PORT` env variable)


### Environment Variables

- `PORT=6001` port of a server which serves index.html for any paths.
- `WEBPACK_PORT=6002` port of webpack-dev-server.
- `API_URL=https://djavan-server-dev.rsl.host/api/v1/` API root endpoint

## Conventions

### Trello

We use [Trello](https://trello.com/b/ceoqc9LQ/djavan-front-end) as a task manager. Please read and follow the rules below:

* Everyone is allowed to create cards.
* Anyone can assign a card to anyone else.
    * Cards don't have to be assigned to someone - they can be left unassigned.
    * Anyone can assign an unassigned card to themselves and start doing the task.
    * New cards can be self-assigned.
    * New cards can be assigned to another team member, if assignee is the best candidate for the task.
* When you start doing a task, you must move the matching card into the “IN DEVELOPMENT” list. Make sure that the card is assigned to you. When the task is done, you must move the matching card to the “IN TESTING” list.
* Only a project manager or designated QA people should move tickets from "IN TESTING" to "COMPLETED" - this is to ensure that new features are 100% correct and match all specifications.
* Any task that is going to take more than 30 minutes should have its own Trello card. For example, if you want do some minor refactoring and you think it will take an hour, then create a card and assign it to yourself.
* When a commit is made it should be connected to a corresponding Trello card. There should be one commit per one feature/fix/task, and you can attach more than one commit to one Trello card (e.g. one card requires to make 2 features). This can be done via Trello UI: open a card -> Power-Ups -> Bitbucket.
    * You don't need to connect a commit to a ticket if the change you're commit took less than 30 minutes and/or it never had a card of its own in the first place..
* When you write a comment to a card, don’t forget to mention a person who should get a notification.

### Rules and guidelines for commit messages

#### TL;DR

1. Use git's file staging: `git add` rather than `git commit -a`.
1. Use `npm run commit` instead of `git commit`.

#### Details

This repository uses [semantic-release](https://github.com/semantic-release/semantic-release) for a clearer, more useful changelog, and for automatic [semantic versioning](http://semver.org).

This means commit messages must be in a special format with a structured summary line and a body. If you use `npm run commit`, you're prompted for everything. If you don't, the format's simple enough to get right manually -- and if you get it wrong, the commit fails anyway as a githook enforces the format.

How it works:

1. Make repository changes as usual.
1. Stage files for commit using `git add`.
1. Instead of `git commit`, use `npm run commit`.
1. Follow the instructions.

Commit messages are stored in git in this format:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
```

For example:

```
feat(services): Add foo field

This lets us show the foo.
```

For more info read about [AngularJS Commit Message Conventions](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md). We require to use `type` and `subject`; `scope` is desirable. Other commit text components are optional.
