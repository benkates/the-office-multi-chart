<script>
  import { format } from "d3";
  import { fly } from "svelte/transition";
  import { selectedCat } from "./stores";

  export let data;
  export let x;
  export let y;
  export let id;
  export let isHovered;

  //export relevant mouse functions
  export function mouseOver(e, i) {
    isHovered = true;
    x = e.layerX + 10;
    y = e.layerY + 10;
    $selectedCat = i;
  }
  export function mouseMove(e) {
    x = e.layerX + 10;
    y = e.layerY + 10;
  }
  export function mouseLeave() {
    isHovered = false;
    $selectedCat = null;
  }
</script>

{#if data && isHovered}
  <!-- if data and hover flag, show tooltip -->
  <div
    id="tooltip{id}"
    style="top: {y}px; left: {x}px;"
    transition:fly={{ y: 50, duration: 250 }}
  >
    <span><strong>{data.name}</strong></span>
    <br />
    <span>Word Count: {format(",")(data.count)}</span>
    <br />
    <span>Negative: {format(".01%")(data.neg)}</span>
    <br />
    <span>Positive: {format(".01%")(data.pos)}</span>
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
