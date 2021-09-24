<script type="ts">
  import axios from "axios";
  import Entry from './components/Entry.svelte';
  import Preview from './components/Preview.svelte';
  import JSONViewer from './components/JSONViewer.svelte';
  import NavBar from './components/NavBar.svelte';
  import { baseUrl } from './config.js';

  let filetreeItems = [];
  let data : any = {};
  let url : string;
  let searchPhrase : string;

  function navigateHandler(event) {
    navigate(event.detail);
  }

  async function navigate(to?: string) {
    filetreeItems = [];
    data = { meta: undefined, image: undefined};
    url = to || '';
    window.location.search = url ? `?path=${url}` : '';
  }

  function openFileHandler(event) {
    getMetadata(event.detail);
  }

  async function getMetadata(from: string) {
    data = { meta: undefined, image: undefined, iptc: undefined };
    data = {...(await axios.get(baseUrl + from)).data };
  }


  async function getItems(searchPhrase ?: string){
    url = window.location.search.split('=')[1]
    filetreeItems = (await axios.get((url ? `${baseUrl}${url}` : baseUrl) + (searchPhrase ? `?filter=${searchPhrase}` : ''))).data;
  }

  function downloadFileHandler(event) {
    startDownload(event.detail);
  }

  async function startDownload(path : string){
    let file = await axios.get(`${baseUrl}${url}?action=download`);

  }


$: getItems(searchPhrase);
</script>

<main>
  <NavBar
    filetreeItems={filetreeItems}
    bind:searchPhrase={searchPhrase}
    {url}
    on:navigate={navigateHandler}
    on:openFile={openFileHandler}
    on:download={downloadFileHandler}
  ></NavBar>
  <div class="preview">
    {#if data.image ?? data.meta}
      <Preview data="{data}" path={url}></Preview>
    {/if}
    {#if data.imageStack}
      <JSONViewer data="{data}"></JSONViewer>
    {/if}
  </div>
</main>

<style>
main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: .5fr 1.5fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". .";
}

.preview {
  background-color: black;
  width: 100%;
  color: var(--grey-5);
  overflow-y: scroll;
}
</style>
