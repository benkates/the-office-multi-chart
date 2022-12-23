<script>
  import { scaleLinear, scaleBand } from "d3-scale";
  import PosNegChartAxis from "./PosNegChartAxis.svelte";
  import Tooltip from "../utils/Tooltip.svelte";

  import { tweened } from "svelte/motion";
  import * as easings from "svelte/easing";

  export let margin;
  export let catData;

  let hoveredData;
  let width = 400;
  let height = 400;

  //setup x positive scale
  $: xPosScale = scaleLinear()
    .domain([0, 1])
    .rangeRound([0, width / 2 - margin.right / 2 - margin.left / 2]);

  //setup x negative scale
  $: xNegScale = scaleLinear()
    .domain([0, -1])
    .rangeRound([0, width / 2 - margin.right / 2 - margin.left / 2]);
  //setup y scale
  $: yScale = scaleBand()
    .domain(catData.map((e) => e.name))
    .rangeRound([margin.top, height - margin.bottom])
    .paddingInner(0.25);

  //setup full scale for axis
  $: xFullScale = scaleLinear()
    .domain([-1, 1])
    .rangeRound([margin.left, width - margin.right]);

  //setup animation
  const tweenedRect = tweened(0, {
    delay: 0,
    duration: 1250,
    easing: easings.cubicOut,
  });
  tweenedRect.set(1);

  //setup tooltip funs
  let tooltip, isHovered, x, y;
</script>

<div bind:clientWidth={width}>
  <Tooltip bind:this={tooltip} data={hoveredData} {x} {y} id="2" {isHovered} />
  <svg {height} {width}>
    <PosNegChartAxis
      {catData}
      {width}
      {height}
      {margin}
      {xFullScale}
      {yScale}
    />
    <g id="negGroup">
      {#each catData as d}
        <rect
          x={width / 2 +
            margin.left / 2 -
            margin.right / 2 -
            xNegScale(d.neg) * $tweenedRect}
          y={yScale(d.name)}
          width={xNegScale(d.neg) * $tweenedRect}
          height={yScale.bandwidth()}
          fill={"red"}
          opacity={hoveredData ? (hoveredData == d ? 1 : 0.45) : 1}
          on:focus={(e) => {
            tooltip.mouseOver(e);
            hoveredData = d;
          }}
          on:mouseover={(e) => {
            tooltip.mouseOver(e);
            hoveredData = d;
          }}
          on:mousemove={tooltip.mouseMove}
          on:mouseleave={(e) => {
            tooltip.mouseLeave(e);
            hoveredData = null;
          }}
          on:blur={(e) => {
            tooltip.mouseLeave(e);
            hoveredData = null;
          }}
        />
      {/each}
    </g>
    <g id="posGroup">
      {#each catData as d}
        <rect
          x={width / 2 + margin.left / 2 - margin.right / 2}
          y={yScale(d.name)}
          width={xPosScale(d.pos) * $tweenedRect}
          height={yScale.bandwidth()}
          fill={"darkblue"}
          opacity={hoveredData ? (hoveredData == d ? 1 : 0.55) : 1}
          on:focus={(e) => {
            tooltip.mouseOver(e);
            hoveredData = d;
          }}
          on:mouseover={(e) => {
            tooltip.mouseOver(e);
            hoveredData = d;
          }}
          on:mousemove={tooltip.mouseMove}
          on:mouseleave={(e) => {
            tooltip.mouseLeave(e);
            hoveredData = null;
          }}
          on:blur={(e) => {
            tooltip.mouseLeave(e);
            hoveredData = null;
          }}
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  /* control opacity change */
  rect {
    transition: opacity 500ms ease;
    cursor: pointer;
  }
</style>
