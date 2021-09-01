<script type="ts">
  import { bind } from "svelte/internal";

  import { createEventDispatcher } from 'svelte';

  import Entry from './Entry.svelte';

  export let filetreeItems : Array<Any> = [];
  export let url : String = "";
  export let searchPhrase : String = "";

  const dispatch = createEventDispatcher();

  function getResource() : string {
    let routes = url.split('/');
    routes.pop();
    return routes.join('/');
  }

  function navigate(location) {
    dispatch('navigate', location);
  };

  function openFile(file) {
    dispatch('openFile', file);
  };

  let currentItem = "";
</script>

<nav>
  <div class="logo">cda_</div>
  <div class="search">
    <span class="icon material-icons aligned">search</span>
    <input type="text" class="searchbar" placeholder="*" bind:value={searchPhrase}>
  </div>
  <div class="search-results-info">
    {#if filetreeItems.filter((item)=>item.type === 'directory').length > 0}
    <div class="aligned">
      <span class="material-icons">folder_opens</span>
      {filetreeItems.filter((item)=>item.type === 'directory').length} Verzeichnisse gefunden
    </div>
    {/if}
    {#if filetreeItems.filter((item)=>item.type === 'image').length > 0}
    <div class="aligned">
      <span class="material-icons">image</span>
      {filetreeItems.filter((item)=>item.type === 'image').length}
      Bilder gefunden
    </div>
    {/if}
  </div>
  <div class="location aligned">
    <span class="material-icons">location_on</span> {url ? url : '/'}
  </div>
  <div class="actions"></div>
  <div class="filetree">
    {#if url}<Entry name=".." type="top" on:click={() => {navigate(getResource())}}></Entry>{/if}
    {#each filetreeItems as item}
    <Entry {...item} on:click={() => { currentItem = item.name; item.type == 'directory' ? navigate(item.resource) : openFile(item.resource);}}></Entry>
    {/each}
  </div>
</nav>

<style>
nav {
  padding: var(--l);
  background-color: var(--darker);
  color: var(--lighter);
  min-width: 400px;
}

nav > * {
  margin-bottom: var(--m);
}

.logo {
  color: var(--accent);
  font-size: var(--l);
  font-weight: var(--fw-light);
}

.search {
  background-color: transparent;
  border-bottom: 1px solid var(--accent);
  margin-bottom: var(--s);
}

.searchbar {
  background-color: transparent;
  border: none;
  outline: none;
  color: inherit;
  margin: 0;
  padding: var(--xxs);
}

.search-results-info {
  color: var(--light);
}

.location {
  color: var(--lighter);
}

.icon{
  color: var(--accent);
}
</style>