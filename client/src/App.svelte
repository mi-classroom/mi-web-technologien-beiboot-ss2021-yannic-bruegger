<script>
  import Entry from './components/Entry.svelte';
  function navigate() {
    console.log('Hello World');
  }
</script>

<main>
 <h1>Test</h1>
 <Entry type="file" on:click={navigate}></Entry>
 <Entry></Entry>
 <Entry></Entry>
 <Entry></Entry>
</main>

<style>

</style>
