<script type="ts">
  export let key : string;
  export let value : any;
  export let open : boolean;
</script>

<div class="lines">
{#if typeof value === 'object'}
<details open={open} class={typeof value === 'object' ? 'object' : ''}>
  <summary>{key}</summary> 
  {#each Object.keys(value) as subKey}
    <svelte:self class="indent" key={subKey} value={value[subKey]}></svelte:self>
  {/each}
</details>
{:else if typeof value === 'string'}
<div class="values">{key}: <span class="value">{value}</span></div>
{:else}
<div class="values">{key}: <span class="value">{JSON.stringify(value)}</span></div>
{/if}
</div>
<style>
  summary {
    position: relative;
    padding: 5px;
    margin-left: -20px;
    color: var(--light);
  }
  .object > summary {
    color: var(--accent);
  }
  summary::marker {
    color: var(--light);
  }

  details * {
    margin-left: 15px;
  }
  details:not(:first-child) {
    border-left: 1px solid var(--dark);
  }

  .lines {
    font-family: var(--font-code);
  }
  .lines:not(:first-child) {
    border-left: 1px solid var(--dark);
  }
  .values {
    padding: 4px;
    padding-left: 40px; 
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