<script type="ts">
  export let type = "directory";
  console.log(type);
</script>

<main on:click>
  <span class="icon">{type == "directory" ? '📁' : '📄'}</span><span>Testfile.png</span>
</main>

<style>
main {
  width: 100%;
  border-top: 1px solid var(--grey-4);
  padding: 1em 1em;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) .5s all;
}

main:last-child {
  border-bottom: 1px solid var(--grey-4);
}

main:hover {
  background-color: var(--grey-5);
}

.icon {
  margin-right: 1em;
}
</style>
