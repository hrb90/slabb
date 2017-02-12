#Slabb

Heroku link

##The Real MVP

Slabb is a live chat application inspired by Slack built with Rails, React, and Redux. By the end of Week 9, this app will satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest login
- [ ] A production README
- [ ] Live chat
- [ ] Channels
- [ ] Direct message
- [ ] Multi-person DMs
- [ ] Message search (stretch)
- [ ] Multiple teams (stretch)

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: docs/wireframes
[components]: docs/component-hierarchy.md
[sample-state]: docs/sample-state.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Timeline

### Phase 1: Auth (1 day)

**Objective**: Functioning rails project with backend and frontend authentication.

### Phase 2: Channels and DMs (2 days)

**Objective**: Can create and subscribe to channels and DM groups. Build out models, API routes, and the outer React components; should display messages in a rudimentary fashion given appropriate seed data.

### Phase 3: Live Chat (3 days)

#### Phase 3a: Pushing (0.5 days)

**Objective**: Build a toy app with Pusher

#### Phase 3b: Messages Model, API, and backend logic (1.5 days)

**Objective**: Build out the Messages model and API routes. Be able to CRUD messages with AJAX requests, and ensure that the server pushes messages to subscribers.

#### Phase 3c: Messages frontend (1 day)

**Objective**: Build the Messages components and styling

etc.

### Phase 4: Indexes (1.5 days)

**Objective**: Build the ChannelIndex and UserIndex components, along with associated API routes (if they don't already exist).

### Phase 5: Search (2 days)

**Objective**: Build search.
