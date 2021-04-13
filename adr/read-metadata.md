# Read metadata from files

## Status

proposed; trial

## Context

In order to allow the client to display and modify metadata of files, the server needs to read/write image metadata first.

## Decision

Use the Node.js module [Sharp](https://sharp.pixelplumbing.com/api-input) to read and modify metadata of images.

## Consequences

Sharp can read and write metadata of images without loading the whole image into memory. This results in a good performance.

Sharp has more features that might become useful someday. Anyway, if none of those features will be used in the future, Sharp might be oversized.
