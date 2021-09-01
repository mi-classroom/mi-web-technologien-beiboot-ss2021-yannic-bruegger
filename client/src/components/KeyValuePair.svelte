<script type="ts">
  export let key : string;
  export let value : any;
  export let open : boolean;
</script>

{#if typeof value === 'object'}
<details open={open} class={typeof value === 'object' ? 'object' : ''}>
  <summary>{key}</summary> 
  {#each Object.keys(value) as subKey}
    <svelte:self class="indent" key={subKey} value={value[subKey]}></svelte:self>
  {/each}
</details>
{:else if typeof value === 'string'}
<div class="values">{key} : <span class="value">{value}</span></div>
{:else}
<div class="values">{key} : <span class="value">{JSON.stringify(value)}</span></div>
{/if}
<style>
  summary {
    position: relative;
    margin: 10px;
    color: var(--light);
  }
  .object > summary {
    color: var(--accent);
  }
  summary::marker {
    color: var(--light);
  }

  details * {
    margin-left: 30px;
  }

  .values {
    padding: 4px;
    padding-left: 10px; 
    border-radius: 5px;
    color: var(--light);
  }

  .value {
    margin-top: 5px;
    background-color: rgba(255, 255, 255, 0.205);
    padding: 4px;
    border-radius: 5px;
    color: var(--lighter);
  }
</style>