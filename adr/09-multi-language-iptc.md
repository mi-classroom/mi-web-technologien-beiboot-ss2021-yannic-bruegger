# Multilingual IPTC management

## Status

info

## Context

One task is to save IPTC data in multiple languages. Unfortunately IPTC does not suppoert multi language to that extend. Therefore a workaround has to be found. The initial idea was to save JSON data in a IPTC field that has multiple key value pairs. One each for every saved language.

## Decision

We will not implement that due to technical difficulties. IPTC fields have specific maximum sizes and must not be exceeded. See [here](https://exiftool.org/TagNames/IPTC.html). Most of the fields have a limit if 32 characters which is not enaugh to store a additional JSON structure. Every additional language would decrease the content size significantly. A solution like taht would not be stable and not comply to the IPTC standard!

## Consequences

There is a feture missing now. I suggest to overthink the idea of using IPTC data for these information in general. IPTC should contain metadata about the image itself, not the content it shows. We will most likely run into more obstacles like this when sticking to our use cases and to IPTC.