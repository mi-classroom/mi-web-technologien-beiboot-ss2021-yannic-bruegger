# Choose a dependency to create a zip archive

## Status

applied

## Context

One predefined task was to containerize the application. Server and client should be a in seperate container. People who want to get a copy of the application startet need to manually start (and configure) both client and server manually.

## Decision

We will use [docker-compose](https://docs.docker.com/compose/) to make the whole application represented in a single docker file. This file can handle setting up, configuring and starting both modules/containers.

## Consequences

It's especially easy to start the application. One simply has to execute ``docker-compose up``.