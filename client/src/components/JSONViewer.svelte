<script type="ts">
  import KeyValuePair from './KeyValuePair.svelte'
  export let data;
</script>
<div>
  <KeyValuePair key="Content" value={data} open={true}></KeyValuePair>
</div>

<style>
  div {
    padding: 20px;
    font-size: 20px;
  }
</style>