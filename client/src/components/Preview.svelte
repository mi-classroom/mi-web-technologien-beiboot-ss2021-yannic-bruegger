<script type="ts">
  interface imageData {
    meta: any
    image: string
  };

  export let data;
</script>

<main>
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
  <div class="preview">
    <img src="{data.image}" alt="{data.meta.Artist}">
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
.metadata {
  position: absolute;
  top: 1em;
  right: 1em;
  background-color: #00000041;
  max-width: 300px;
  padding: 1em;
}
</style>