<script>
  import nodes from "../data/nodes.json";
  import { selectedTranscript } from "./stores";
  import { FormGroup, Input } from "sveltestrap";
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
