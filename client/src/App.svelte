<script type="ts">
  import axios from "axios";
  import Entry from './components/Entry.svelte';
  import Preview from './components/Preview.svelte';

  const baseUrl = 'http://127.0.0.1:3000';
  let items = [];
  let meta = {};
  let url : string;

  async function navigate(to?: string) {
    items = [];
    meta = {};
    url = to || '';
    window.location.search = url ? `?path=${url}` : '';
  }

  async function getMetadata(from: string) {
    meta = {};
    meta = {...(await axios.get(baseUrl + from)).data};
    console.log(meta);
  }

  function getResource() : string {
    let routes = url.split('/');
    routes.pop();
    return routes.join('/');
  }
  async function getItems(){
    url = window.location.search.split('=')[1]
    items = (await axios.get(url ? baseUrl + url : baseUrl)).data;
    console.log(items);
  }


  getItems();
</script>

<main>
  <div class="nav">
    <div class="url">{url ? url : '/'}</div>
    {#if url && items.length > 0}<Entry name=".." type="top" on:click={() => {navigate(getResource())}}></Entry>{/if}
    {#each items as item}
    <Entry {...item} on:click={() => {item.type == 'directory' ? navigate(item.resource) : getMetadata(item.resource);}}></Entry>
    {/each}
  </div>
  <div class="preview">
    {#if Object.keys(meta).length > 0}
      <Preview meta="{meta}"></Preview>
    {/if}
  </div>
</main>

<style>
main {
  height: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". .";
}

.preview {
  width: 100%;
  background-color: var(--grey-0);
  color: var(--grey-5);
}

.url {
  width: 100%;
  padding: 1em 1em;
}
.url:last-child {
  border-bottom: 1px solid var(--grey-4);
}
</style>
