<script>
  import { scaleLinear, scaleBand } from "d3-scale";
  import PosNegChartAxis from "./PosNegChartAxis.svelte";
  import Tooltip from "../utils/Tooltip.svelte";
  import marginFun from "../utils/margin";

  import { tweened } from "svelte/motion";
  import * as easings from "svelte/easing";
  import { clickFun } from "../utils/clickFun";

  export let catData;
  export let marker;

  let hoveredData;
  let width = 400;
  let height = 400;
  let margin = marginFun(width, height);

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
  <!-- tooltip -->
  <Tooltip bind:this={tooltip} data={hoveredData} {x} {y} id="2" {isHovered} />
  <!-- svg -->
  <svg {height} {width}>
    <!-- axis -->
    <PosNegChartAxis
      {catData}
      {width}
      {height}
      {margin}
      {xFullScale}
      {yScale}
    />
    <!-- negative rect group -->
    <g id="negGroup">
      {#each catData as d, i}
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
          data-value={i}
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
          on:keydown={(e) => clickFun(e, marker)}
          on:click={(e) => clickFun(e, marker)}
        />
      {/each}
    </g>
    <!-- positive rect group -->
    <g id="posGroup">
      {#each catData as d, i}
        <rect
          x={width / 2 + margin.left / 2 - margin.right / 2}
          y={yScale(d.name)}
          width={xPosScale(d.pos) * $tweenedRect}
          height={yScale.bandwidth()}
          fill={"darkblue"}
          opacity={hoveredData ? (hoveredData == d ? 1 : 0.55) : 1}
          data-value={i}
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
          on:keydown={(e) => clickFun(e, marker)}
          on:click={(e) => clickFun(e, marker)}
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
