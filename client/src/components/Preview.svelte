<script type="ts">
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
</script>

<main>
  <div class="preview">
    <img src="{data.image}" alt="{data.meta.Artist}">
  </div>
  <MetadataEditor></MetadataEditor>
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

img {
  max-height: calc(100% - 2em);
  max-width: 100%;
  position: absolute;
}
</style>