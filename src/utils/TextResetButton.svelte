<script>
  export let marker;
  import { Button } from "sveltestrap";

  function resetMarker() {
    marker.unmark();
  }
</script>

<Button color="secondary" size="sm" outline on:click={resetMarker}
  >Reset Highlight</Button
>
