<script type="ts">
  import { onMount } from 'svelte';
  import OpenSeadragon, { TileSource } from 'openseadragon';
  import Entry from './Entry.svelte';
  import MetadataEditor from './MetadataEditor.svelte';

  interface imageData {
    meta: any
    iptc: any
    image: string
  };

  async function saveChanges() {
    loading = true;
    await fetch(`http://127.0.0.1:3000${path}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data.iptc),
    });
    loading = false;
  }

  
  export let data;
  export let path;
  let loading = false;
  onMount(() => {
    var viewer = OpenSeadragon({ id: "openseadragon", maxZoomLevel: 120, showNavigationControl: false });
    viewer.addSimpleImage({url: data.image})
  });
</script>

<main>
  <div class="preview">
    <div id="openseadragon"></div>
  </div>
  <MetadataEditor data={data}></MetadataEditor>
</main>

<style>
.preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
main {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
}

main::-webkit-scrollbar {
  display: none;
}

#openseadragon {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>