<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Input from './Input.svelte';

  enum InputType {
    SINGLE_LINE_OF_TEXT,
    MULTIPLE_LINES_OF_TEXT,
  }

  let data;
  let loading;
  let expanded = false;
</script>

<footer class:expanded={expanded}>
  <div class="top">
    <div class="aligned">
      <span class="material-icons">crop_7_5</span>
      Größe: 100x100
    </div>
    <div class="aligned expander" on:click={() => {expanded = !expanded; console.log(expanded)}}>
      <span class="material-icons accent">list</span>
      IPTC: -
    </div>
  </div>
  <div class="bottom">
    <div class="column">
      <Input label="Title" type={InputType.SINGLE_LINE_OF_TEXT} maxLength={32}/>
      <Input label="Title" type={InputType.SINGLE_LINE_OF_TEXT} maxLength={32}/>
      <Input label="Title" type={InputType.SINGLE_LINE_OF_TEXT} maxLength={32}/>
      <Input label="Title" type={InputType.SINGLE_LINE_OF_TEXT} maxLength={32}/>
    </div>
    <div class="column">
      <Input label="Title" type={InputType.SINGLE_LINE_OF_TEXT} maxLength={32}/>
      <Input label="Title" type={InputType.SINGLE_LINE_OF_TEXT} maxLength={32}/>
      <Input label="Title" type={InputType.SINGLE_LINE_OF_TEXT} maxLength={32}/>
      <Input label="Title" type={InputType.SINGLE_LINE_OF_TEXT} maxLength={32}/>
    </div>
  </div>
</footer>

<style>
footer {
  background-color: var(--dark);
  position: absolute;
  bottom: -42vh;
  width: 100%;
  height: 50vh;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) .5s all;
  color: var(--lighter);
  padding: var(--m);
  font-size: 1em;
}

.top {
  margin-bottom: var(--m);
}

.bottom {
  display: flex;
  gap: var(--s);
  width: 100%;
}

.column {
  flex: 1;
}

.expanded {
  bottom: 0;
}

.accent {
  color: var(--accent);
}

.expander {
  cursor: pointer;
}
</style>