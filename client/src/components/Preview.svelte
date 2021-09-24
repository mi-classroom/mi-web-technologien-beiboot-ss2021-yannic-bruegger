<script type="ts">
  import { onMount } from 'svelte';
  import OpenSeadragon, { TileSource } from 'openseadragon';
  import MetadataEditor from './MetadataEditor.svelte';

  import { iptcFields } from '../config';

  interface imageData {
    meta: any
    iptc: any
    image: string
  };

  export let data;
  export let path;
  let loading = false;
  onMount(() => {
    var viewer = OpenSeadragon({ id: "openseadragon", maxZoomLevel: 120, showNavigationControl: false });
    viewer.addSimpleImage({url: data.image})
  });

  async function saveChanges() {
    loading = true;

    const allowedFields = iptcFields.map(field => field.fieldName);
    const fieldsToUpdate = Object.keys(data.iptc)
    .filter(field => allowedFields.includes(field))
    .reduce((obj, key) => {
      obj[key] = data.iptc[key];
      return obj;
    }, {});

    await fetch(`http://127.0.0.1:3000${path}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(fieldsToUpdate),
    });
    loading = false;
  }
</script>

<main>
  <div class="preview">
    <div id="openseadragon"></div>
  </div>
  <MetadataEditor data={data} on:save={saveChanges}></MetadataEditor>
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