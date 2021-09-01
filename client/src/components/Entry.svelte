<script type="ts">
  export let name = '';
  export let type = '';
  export let resource = '';
  export let displayName = '';
  const icons = {
    'directory': 'folder_open',
    'file': 'description',
    'image': 'image',
    'top': 'chevron_left',
  }
  resource;
  displayName;
</script>

<main on:click>
  <span class="icon"><span class="material-icons">{icons[type]}</span></span><span>{name}</span>
</main>

<style>
main {
  width: 100%;
  user-select: none;
  margin-bottom: var(--xxxs);
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon {
  margin-right: var(--xs);
  color: var(--accent);
}
</style>
