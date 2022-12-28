<script>
  import { format } from "d3";
  import { fly } from "svelte/transition";
  import { selectedChar } from "./stores";

  export let data;
  export let x;
  export let y;
  export let id;
  export let isHovered;
  export let float = true;

  //export relevant mouse functions
  export function mouseOver(e, i) {
    isHovered = true;
    x = e.layerX + 10;
    y = e.layerY + 10;
    $selectedChar = i;
  }
  export function mouseMove(e) {
    x = e.layerX + 10;
    y = e.layerY + 10;
  }
  export function mouseLeave() {
    isHovered = false;
    $selectedChar = null;
  }
</script>

{#if data && isHovered}
  <!-- if data and hover flag, show tooltip -->
  <div
    id="tooltip{id}"
    style="top: {float ? y : 30}px; left: {float ? x : 0}px;"
    transition:fly={{ y: 50, duration: 250 }}
  >
    <span><strong>{data.name}</strong></span>
    <br />
    <span>Ttl Word Count: {format(",")(data.count)}</span>
    <hr style="margin:3px 0;" />
    <span>Negative Word%: {format(".01%")(data.neg * -1)}</span>
    <br />
    <span>Positive Word%: {format(".01%")(data.pos)}</span>
  </div>
{/if}

<style>
  [id^="tooltip"] {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple   Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    background: rgba(69, 77, 93, 0.9);
    border-radius: 0.25rem;
    border: 1px solid #ddd;
    box-shadow: 1px 1px 1px #ddd;
    color: #fff;
    font-size: 12px;
    padding: 0.2rem 0.4rem;
    position: absolute;
    z-index: 300;
  }
</style>
