<script lang="ts">
  import Input from './Input.svelte';
  import { InputType } from './Input.svelte';

  export let data = {iptc: undefined};
  let loading;
  let expanded = false;
  const languages = ['de', 'en']
  const iptcFields = [
    { fieldName: 'Title', labels: { de: 'Titel', en: 'Title' }, inputType: InputType.SINGLE_LINE_OF_TEXT, maxLength: 32 },
    { fieldName: 'Caption', labels: { de: 'Dateiart / Beschreibung', en: 'Type / Description' }, inputType: InputType.MULTIPLE_LINES_OF_TEXT, maxLength: 2000 },
    { fieldName: 'Creator', labels: { de: 'Autor / Rechte', en: 'Author / Copyright' }, inputType: InputType.SINGLE_LINE_OF_TEXT, maxLength: 32 },
    { fieldName: 'Credit', labels: { de: 'Quelle', en: 'Source' }, inputType: InputType.SINGLE_LINE_OF_TEXT, maxLength: 32 },
  ];
  let metadata = {
    de: {
      Title: 'Some Title',
      Caption: 'Some Caption',
      Creator: 'Me',
      Credit: 'Museum of arts',
    },
    en: {
      Title: 'Some Title',
      Caption: 'Some Caption',
      Creator: 'Me',
      Credit: 'Museum of arts',
    }
  }
</script>

<footer class:expanded={expanded}>
  <div class="top">
    <div class="aligned">
      <span class="material-icons">crop_7_5</span>
      Größe: {data.iptc.ImageSize}px
    </div>
    <div class="aligned expander" on:click={() => {expanded = !expanded; console.log(expanded)}}>
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
        bind:value={metadata[language][iptcField.fieldName]}/>
      { /each }
    </div>
    { /each }
  </div>
  <div class="aligned">
    <button><span class="material-icons">save</span>Speichern</button>
    <button><span class="material-icons">close</span>Abbrechen</button>
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