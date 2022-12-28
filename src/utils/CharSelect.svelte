<script>
  import charData from "../data/nodes.json";
  import { selectedTranscript } from "./stores";
  import { FormGroup, Input } from "sveltestrap";
  import { afterUpdate } from "svelte";

  export let marker;

  //after the character changes, highlight + scroll to the top of the div
  afterUpdate(() => {
    document.getElementById("text-container").scrollTop = 0;
    let i = charData.findIndex((d) => d.name === $selectedTranscript);

    marker.mark($selectedTranscript, {
      className: `group-${i}`,
      accuracy: "exactly",
    });
  });
</script>

<FormGroup style="margin-bottom:0 !important;">
  <Input
    type="select"
    name="select"
    id="charSelect"
    bind:value={$selectedTranscript}
  >
    {#each charData as char}
      <option>{char.name}</option>
    {/each}
  </Input>
</FormGroup>
