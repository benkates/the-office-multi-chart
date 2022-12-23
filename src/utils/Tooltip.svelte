<script>
  import { format } from "d3";
  import { fly } from "svelte/transition";
  export let data;
  export let x;
  export let y;
  export let id;
  export let isHovered;

  export function mouseOver(e) {
    isHovered = true;
    x = e.layerX + 10;
    y = e.layerY + 10;
  }
  export function mouseMove(e) {
    x = e.layerX + 10;
    y = e.layerY + 10;
  }
  export function mouseLeave() {
    isHovered = false;
  }
</script>

{#if data && isHovered}
  <div id="tooltip{id}" style="top: {y}px; left: {x}px;" transition:fly>
    <span><strong>{data.name}</strong></span>
    <br />
    <span>Count: {data.count}</span>
    <br />
    <span>Positive: {format(".0%")(data.pos)}</span>
    <br />
    <span>Negative: {format(".0%")(data.neg)}</span>
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
    /* display: block; */
    font-size: 12px;
    padding: 0.2rem 0.4rem;
    position: absolute;
    z-index: 300;
  }
</style>
