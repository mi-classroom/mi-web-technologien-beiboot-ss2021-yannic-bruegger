# Choose server side language

## Status

proposed; trial

## Context

In order to access files of a servers local file directory from a web client, a web-service is required.

## Decision

Use JavaScript (with Node.js) as programming language for the web service.

## Consequences

This project's server and client side development will probably be maintained by the same developers. Using JavaScript in front- and backend lowers the barrier for backend developers to understand frontend code and vice versa.

Furthermore, we can access the local file system and serve data to the client via http-requests with Node.js's APIs.
