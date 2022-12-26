<script>
  import nodes from "../data/nodes.json";
  import { selectedTranscript } from "./stores";
  import { FormGroup, Input } from "sveltestrap";
  import { afterUpdate } from "svelte";

  //after the character changes, scroll to the top of the div
  afterUpdate(() => {
    document.getElementById("text-container").scrollTop = 0;
  });
</script>

<FormGroup>
  <Input
    type="select"
    name="select"
    id="charSelect"
    bind:value={$selectedTranscript}
  >
    {#each nodes as node}
      <option>{node.name}</option>
    {/each}
  </Input>
</FormGroup>
