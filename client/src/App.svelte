<script type="ts">
  import axios from "axios";
  import Entry from './components/Entry.svelte';
  import Preview from './components/Preview.svelte';

  const baseUrl = 'http://127.0.0.1:3000';
  let items = [];
  let data = { meta: undefined, image: undefined};
  let url : string;
  let searchPhrase : string;

  async function navigate(to?: string) {
    items = [];
    data = { meta: undefined, image: undefined};
    url = to || '';
    window.location.search = url ? `?path=${url}` : '';
  }

  async function getMetadata(from: string) {
    data = { meta: undefined, image: undefined};
    data = {...(await axios.get(baseUrl + from)).data};
    console.log(data);
  }

  function getResource() : string {
    let routes = url.split('/');
    routes.pop();
    return routes.join('/');
  }
  async function getItems(searchPhrase : string){
    url = window.location.search.split('=')[1]
    items = (await axios.get((url ? `${baseUrl}${url}` : baseUrl) + (searchPhrase ? `?filter=${searchPhrase}` : ''))).data;
    console.log(items);
  }


$: getItems(searchPhrase);
</script>

<main>
  <div class="nav">
    <input type="text" class="search" placeholder="Search ..." bind:value={searchPhrase}>
    <div class="url">{url ? url : '/'}</div>
    {#if url}<Entry name=".." type="top" on:click={() => {navigate(getResource())}}></Entry>{/if}
    {#each items as item}
    <Entry {...item} on:click={() => {item.type == 'directory' ? navigate(item.resource) : getMetadata(item.resource);}}></Entry>
    {/each}
  </div>
  <div class="preview">
    {#if data.image ?? data.meta}
      <Preview data="{data}"></Preview>
    {/if}
  </div>
</main>

<style>
main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". .";
}

.preview {
  width: 100%;
  color: var(--grey-5);
}

.nav {
  padding: 1em;
  background-color: var(--color-background-secondary);
  border-right: 1px solid var(--color-border-secondary);
}

.url {
  width: 100%;
  padding: 1em 1em;
  color: var(--color-foreground-primary);
  font-size: 1.3em;
}
.url:last-child {
  border-bottom: 1px solid var(--grey-4);
}

.search{
  width: 100%;
  background-color: var(--color-background-secondary);
  color: var(--color-foreground-primary);
  border-radius: 3px;
  border-color: var(--color-border-secondary);
}

.search:focus{
  outline: none;
}
</style>
