# Choose client technologies

## Status

applied

## Context

The application needs a frontend which will be based on web technologies by definition. In order to use modern state of the art design patterns like MVC with reactivity and a component structure a client framework might be useful.

## Decision

Use [Svelte](https://svelte.dev/) as a compiler. In comparison to other web frameworks, there is no (or almost no) svelte code deployed to a server because it gets compiled to native code. This is my second project with svelte and I really enjoyed it last time. I'd like to get better with it so I'll give it a try in this project. This time, [TypeScript](https://www.typescriptlang.org/) will be used which is supported by Svelte ootb.

## Consequences

MVC with reactivity and a component structure is given by default when using Svelte. 

TypeScript comes with a lot of advamtages in comparison to JavaScript. It is strongly typed and therefore kickstarts more robust code. The developer experience is better due to autocompletion.