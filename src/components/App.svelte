<script lang="ts">
  import { onMount } from "svelte";
  import { entries, type ContextEntry } from "../model/entries";

  let filteredContextEntries: ContextEntry[] = [];
  let copiedIndex = -1;

  onMount(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = tabs[0].url;
      filteredContextEntries = entries.filter((e) => url.match(e.urlRegex));
    });
    copiedIndex = -1;
  });

  async function copyToClipboard(entry: ContextEntry, index: number) {
    await navigator.clipboard.writeText(entry.text);
    copiedIndex = index;
  }
</script>

<section class="popup">
  <div class="popup_entries">
    {#each filteredContextEntries as entry, index}
      <div class="entry">
        <button
          class="entry__icon {index === copiedIndex
            ? 'entry__icon--selected'
            : ''}"
          on:click={() => copyToClipboard(entry, index)}
        >
          <img
            src={index === copiedIndex ? "/check.svg" : "/copy.svg"}
            alt="Copy icon"
          />
        </button>
        <div class="entry__content">
          <div class="entry__bubble">
            <div class="entry__text">
              {entry.text}
            </div>
          </div>
          <div class="entry__tags">
            {#each entry.tags as tag}
              <span class="entry__tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .popup {
    height: 450px;
    width: 450px;
    padding: 20px;
  }

  .popup_entries {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .entry {
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    background-color: #f2f5f7;
    padding: 10px;
  }

  .entry:not(:first-child) {
    margin-top: 20px;
  }

  .entry__content {
    width: 100%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .entry__bubble {
    border-radius: 20px;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .entry__icon:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 2px 10px #c9eba0;
  }

  .entry__icon:active:after {
    box-shadow: 0 0 0 0 #c9eba0;
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }

  .entry__text {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .entry__tag {
    margin: 0;
    padding: 2px 7px;
    font-size: 0.6rem;
    border-radius: 14px;
    background-color: white;
    color: #4a4a4a;
  }

  .entry__tag:not(:first-child) {
    margin-left: 5px;
  }

  .entry__icon {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: fit-content;
    height: fit-content;
    position: relative;
  }

  .entry__icon--selected {
    background-color: #c9eba0 !important; /* Don't let hover override. */
  }

  .entry__icon:hover {
    background-color: #e3f1d3;
  }

  .entry__icon img {
    width: 24px;
    height: 24px;
    padding: 12px;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: inherit;
  }
</style>
