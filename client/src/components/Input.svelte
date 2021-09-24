<script type="ts" context="module">
  export enum InputType {
    SINGLE_LINE_OF_TEXT,
    MULTIPLE_LINES_OF_TEXT,
  }
</script>

<script type="ts">
  export let label : String;
  export let type : InputType;
  export let maxLength : number = 32;
  export let value : string = "";
  export let disabled : boolean = false;
</script>



<div class="input">
  {#if type === InputType.SINGLE_LINE_OF_TEXT}
  <input bind:value {maxLength} readonly={disabled}>
  {:else if type === InputType.MULTIPLE_LINES_OF_TEXT}
  <textarea bind:value {maxLength} readonly={disabled}></textarea>
  {/if}
  <progress class:red={ 100 * value.length / maxLength > 95} min="0" max={maxLength} value={value.length}></progress>
  <div class="label">{label}</div>
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--s);
  }

  input, textarea {
    width: 100%;
    resize: vertical;
    background-color: var(--medium);
    color: var(--lighter);
    outline: none;
    margin: 0;
  }

  input:read-only, textarea:read-only {
    opacity: .3;
  }

  progress {
    width: 100%;
    padding: 0;
    margin: 0;
    height: 3px;
    background-color: var(--light);
    border: none;
  }
  
  progress::-webkit-progress-bar {
    background-color: var(--light);
  }
  
  progress::-webkit-progress-value{
    background: green;
    transition: .2s width;
  }

  progress::-moz-progress-bar {
    background: green;
    transition: .2s width;
  }

  progress.red::-webkit-progress-value {
    background: red;
  }

  progress.red::-moz-progress-bar {
    background: red;
  }


  .label {
    color: var(--light);
    font-size: 1rem;
  }
</style>