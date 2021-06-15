<script type="ts">
  export let key : string;
  export let value : any;
  export let open : boolean;
</script>

<details open={open}>
  <summary>{key}</summary> 
  {#if typeof value === 'object'}
    {#each Object.keys(value) as subKey}
      <svelte:self class="indent" key={subKey} value={value[subKey]}></svelte:self>
    {/each}
  {:else if typeof value === 'string'}
    <span class="value">{value}</span>

  {:else}
    <span class="value">{JSON.stringify(value)}</span>
  {/if}
</details>

<style>
  summary {
    position: relative;
    margin: 10px;
    color: #999999;
  }

  details * {
    margin-left: 30px;
  }
  .value {
    margin-top: 5px;
    background-color: #00000083;
    padding: 4px 10px;
    border-radius: 5px;
  }
</style>