# Configure the server

## Status

proposed; trial

## Context

Different configurations need to be made depending on where the server will be hosted.

## Decision

Use [dotenv](https://github.com/motdotla/dotenv#readme) module to make configurations in a ``.env`` file.

## Consequences

Settings can be made in a seperate file. Dotenv ensures that these settings can be read from sourcecode.  
