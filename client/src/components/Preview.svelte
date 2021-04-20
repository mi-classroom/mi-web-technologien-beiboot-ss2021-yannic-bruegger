<script type="ts">
  export let meta : any;
</script>

<main>
  <h1>{meta.Artist ?? ''}</h1>
  <table>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr>
    {#each Object.keys(meta) as key}
    <tr>
      <td>{key}</td>
      <td>{meta[key]}</td>
    </tr>
    {/each}
  </table>
</main>

<style>
main {
  width: 100%;
  height: 100%;
  padding: 1em;
}
</style>