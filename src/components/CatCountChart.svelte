<script>
  import { schemePaired, max } from "d3";
  import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";
  import CatCountChartAxis from "./CatCountChartAxis.svelte";

  import marginFun from "../utils/margin";
  import Tooltip from "../utils/Tooltip.svelte";
  import OnMountComp from "../utils/OnMountComp.svelte";
  import clickFun from "../utils/clickFun";
  import { selectedCat } from "../utils/stores";
  import marker from "../utils/mark";

  import { tweened } from "svelte/motion";
  import * as easings from "svelte/easing";
  import { fade } from "svelte/transition";

  export let catData;

  let hoveredData;
  let width = 400;
  let height = 400;

  let margin = marginFun(width, height);

  //setup x positive scale
  $: xScale = scaleLinear()
    .domain([0, max(catData, (d) => d.count)])
    .rangeRound([margin.left, width - margin.right]);

  //setup y scale
  $: yScale = scaleBand()
    .domain(catData.map((e) => e.name))
    .rangeRound([margin.top, height - margin.bottom])
    .paddingInner(0.25);

  //setup color scale
  const colorScale = scaleOrdinal(
    catData.map((e) => e.name),
    schemePaired
  );

  //tween animation
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
    <!--tooltip-->
    <Tooltip
      bind:this={tooltip}
      data={hoveredData}
      {x}
      {y}
      id="2"
      {isHovered}
    />

    <!--svg-->
    <svg {width} {height}>
      <!--axis-->
      <CatCountChartAxis
        {catData}
        {width}
        {height}
        {margin}
        {xScale}
        {yScale}
      />
      <!--category rect group-->
      <g id="catGroup">
        {#each catData as d, i}
          <rect
            x={xScale(0)}
            y={yScale(d.name)}
            width={(xScale(d.count) - margin.left) * $tweenedRect}
            height={yScale.bandwidth()}
            fill={colorScale(d.name)}
            opacity={$selectedCat === null && !hoveredData
              ? 1
              : hoveredData === d || $selectedCat === i
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
              tooltip.mouseLeave();
              hoveredData = null;
            }}
            on:blur={(e) => {
              tooltip.mouseLeave();
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
  rect {
    /* control opacity transition */
    transition: opacity 500ms ease;
    cursor: pointer;
  }
</style>
