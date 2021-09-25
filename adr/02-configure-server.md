# Configure the server

## Status

applied

## Context

Different configurations need to be made depending on where the server will be hosted. Instead of making configuration in the code, we want to seperate it as suggested in [The Twelve-Factor App](https://12factor.net/config).

## Decision

Use [dotenv](https://github.com/motdotla/dotenv#readme) module to make configurations in a ``.env`` file.

## Consequences

Settings can be made in a seperate file. Dotenv ensures that these settings can be read from sourcecode.  
