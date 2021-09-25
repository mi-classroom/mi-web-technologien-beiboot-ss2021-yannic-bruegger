# Decide between a front end powerd search or a back end powered search

## Status

applied

## Context

Users of the application want to seach a directory by adding search phrases. 

## Decision

Possible options are a front end powered search or a back end powered search. 
We will use a back end powered search.

## Consequences

This allows us to handle more complex file structures without relying on the hardware of the client. Additionally it allows us to make use of caching to increase the response time of the server.

A lot more HTTP requests will be send to the server though.