<script>
  import { scaleLinear, scaleBand } from "d3-scale";
  import PosNegChartAxis from "./PosNegChartAxis.svelte";
  import Tooltip from "../utils/Tooltip.svelte";
  import marginFun from "../utils/margin";
  import clickFun from "../utils/clickFun";
  import OnMountComp from "../utils/OnMountComp.svelte";
  import marker from "../utils/mark";
  import { selectedChar } from "../utils/stores";

  import { tweened } from "svelte/motion";
  import * as easings from "svelte/easing";
  import { fade } from "svelte/transition";

  export let catData;

  let hoveredData;
  let width = 400;
  let height = 400;
  let margin = marginFun(width, height);
  let scaleMax = 0.12;

  //setup x positive scale
  $: xPosScale = scaleLinear()
    .domain([0, scaleMax])
    .rangeRound([0, width / 2 - margin.right / 2 - margin.left / 2]);

  //setup x negative scale
  $: xNegScale = scaleLinear()
    .domain([0, -scaleMax])
    .rangeRound([0, width / 2 - margin.right / 2 - margin.left / 2]);

  //setup y scale
  $: yScale = scaleBand()
    .domain(catData.map((e) => e.name))
    .rangeRound([margin.top, height - margin.bottom])
    .paddingInner(0.25);

  //setup full scale for axis
  $: xFullScale = scaleLinear()
    .domain([-scaleMax, scaleMax])
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

<OnMountComp>
  <div bind:clientWidth={width} transition:fade={{ duration: 1250 }}>
    <!-- tooltip -->
    <Tooltip
      bind:this={tooltip}
      data={hoveredData}
      {x}
      {y}
      id="2"
      {isHovered}
    />
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
        {scaleMax}
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
            opacity={$selectedChar === null && !hoveredData
              ? 1
              : hoveredData === d || $selectedChar === i
              ? 1
              : 0.55}
            on:focus={(e) => {
              tooltip.mouseOver(e, i);
              hoveredData = d;
            }}
            on:mouseover={(e) => {
              tooltip.mouseOver(e, i);
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
            on:keydown={(e) => clickFun(e, i, marker)}
            on:click={(e) => {
              clickFun(e, i, marker);
            }}
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
            opacity={$selectedChar === null && !hoveredData
              ? 1
              : hoveredData === d || $selectedChar === i
              ? 1
              : 0.55}
            data-value={i}
            on:focus={(e) => {
              tooltip.mouseOver(e, i);
              hoveredData = d;
            }}
            on:mouseover={(e) => {
              tooltip.mouseOver(e, i);
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
            on:keydown={(e) => clickFun(e, i, marker)}
            on:click={(e) => clickFun(e, i, marker)}
          />
        {/each}
      </g>
    </svg>
  </div>
</OnMountComp>

<style>
  /* control opacity change */
  rect {
    transition: opacity 500ms ease;
    cursor: pointer;
  }
</style>
