# Choose a dependency to handle writing metadata to files

## Status

applied

## Context

Users of the application want to update metadata of one dataset. A dataset is a group of image files in one folder.

## Decision

We will use [exiftool-vendored](https://www.npmjs.com/package/exiftool-vendored) as access to [ExifTool](https://exiftool.org/), a powerful command line tool to read and update many types of metadata.

## Consequences

Metadata can be modified by the user and written to the images after saving. To get started with this nodejs library one needs to understand the basics of ExifTool first. Unfortunately the documentation is quite technical and hard to follow. In comparison to ther metdadata editory, ExifTool is one of the fastest and most efficient.