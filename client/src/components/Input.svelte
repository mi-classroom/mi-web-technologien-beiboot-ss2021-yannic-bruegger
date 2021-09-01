<script type="ts">
  enum InputType {
    SINGLE_LINE_OF_TEXT,
    MULTIPLE_LINES_OF_TEXT,
  }

  export let label : String;
  export let type : InputType;
  export let maxLength : number = 32;
  export let content : string = "";
</script>



<div class="input">
  {#if type === InputType.SINGLE_LINE_OF_TEXT}
  <input bind:value={content}>
  {:else if type === InputType.MULTIPLE_LINES_OF_TEXT}
  <textarea></textarea>
  {/if}
  <progress class:red={ 100 * content.length / maxLength > 95} min="0" max={maxLength} value={content.length}></progress>
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