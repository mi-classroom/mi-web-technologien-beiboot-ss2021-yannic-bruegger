<script type="ts">
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
  <div class="metadata">
    <table>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
      {#each Object.keys(data.iptc) as key}
      <tr>
        <td>{key}</td>
        <td><input bind:value={data.iptc[key]} disabled={loading}></td>
      </tr>
      {/each}
      <tr>
        <td colspan="2"><input disabled={loading} type="submit" value="Save changes" on:click={saveChanges}></td>
      </tr>
    </table>
  </div>
</main>

<style>
main {
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  position: relative;
}
img {
  max-height: calc(100% - 2em);
  max-width: 100%;
  position: absolute;
}
.metadata {
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border-secondary);
  position: absolute;
  top: 1em;
  right: 1em;
  max-width: 400px;
  border-radius: 6px;
}

th, td {
  padding: .5em 1em;
}

input {
  width: 100%;
}
</style>