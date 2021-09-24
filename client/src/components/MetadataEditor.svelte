<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();
  
  import { iptcFields } from '../config';

  import Input from './Input.svelte';
  import { InputType } from './Input.svelte';
  
  export let data = {iptc: undefined};
  let storedIptcState = {iptc: undefined};

  export let loading;
  let expanded = false;
  const languages = ['de', 'en'];
  
  onMount(() => {
    storedIptcState = {...data.iptc};
  });
  function abort() {
    data.iptc = {...storedIptcState};
  }
  function save() {
    storedIptcState = {...data.iptc}
    dispatch('save')
  }
</script>

<footer class:expanded={expanded}>
  <div class="top">
    <div class="aligned">
      <span class="material-icons">crop_7_5</span>
      Größe: {data.iptc.ImageSize}px
    </div>
    <div class="aligned expander" on:click={() => {expanded = !expanded}}>
      <span class="material-icons accent">list</span>
      IPTC: -
    </div>
  </div>
  <div class="bottom">
    { #each languages as language }
    <div class="column">
      { #each iptcFields as iptcField }
      <Input
        label={iptcField.labels[language]}
        type={iptcField.inputType}
        maxLength={iptcField.maxLength}
        bind:disabled={loading}
        bind:value={data.iptc[iptcField.fieldName]}/>
      { /each }
    </div>
    { /each }
  </div>
  <div class="aligned">
    <button on:click={save} disabled={loading}><span class="material-icons">save</span>Speichern</button>
    <button on:click={abort} disabled={loading}><span class="material-icons" >close</span>Abbrechen</button>
  </div>
</footer>

<style>
footer {
  background-color: var(--dark);
  position: absolute;
  bottom: -42vh;
  width: 100%;
  height: 50vh;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) var(--tr-medium) all;
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