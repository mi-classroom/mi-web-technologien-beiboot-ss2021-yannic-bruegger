<script type="ts">
  export let name = '';
  export let type = '';
  export let resource = '';
  export let displayName = '';
  const icons = {
    'directory': '📁',
    'file': '📄',
    'top': '↖️',
  }
  resource;
  displayName;
</script>

<main on:click>
  <span class="icon">{icons[type]}</span><span>{name}</span>
</main>

<style>
main {
  width: 100%;
  border-top: 1px solid var(--color-border-secondary);
  padding: 1em 1em;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) .5s all;
  user-select: none;
}

main:last-child {
  border-bottom: 1px solid var(--color-border-secondary);
}

main:hover {
  background-color: var(--color-background-ternary);
}

.icon {
  margin-right: 1em;
}
</style>
