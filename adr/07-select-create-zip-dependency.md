# Choose a dependency to create a zip archive

## Status

applied

## Context

Users of the application want to download any served directories as a zip archive.

## Decision

We will use [express-easy-zip](https://www.npmjs.com/package/express-easy-zip) to generate ZIP files and send them as a downloadable content via HTTP to the client.

## Consequences

It's especially easy to generate and send ZIP files in this case because express-easy-zip is made to be integrated in an express application. Just a few lines of code need to be written in order to get this feature working.