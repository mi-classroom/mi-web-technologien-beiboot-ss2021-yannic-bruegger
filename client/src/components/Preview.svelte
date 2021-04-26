<script type="ts">
  interface imageData {
    meta: any
    image: string
  };

  export let data;
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
      {#each Object.keys(data.meta) as key}
      <tr>
        <td>{key}</td>
        <td>{data.meta[key]}</td>
      </tr>
      {/each}
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
</style>