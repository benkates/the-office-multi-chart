<script>
  import { schemeCategory10, max } from "d3";
  import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";

  import CatCountChartAxis from "./CatCountChartAxis.svelte";
  import marginFun from "../utils/margin";

  import Tooltip from "../utils/Tooltip.svelte";

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
    schemeCategory10
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

<div bind:clientWidth={width}>
  <!--tooltip-->
  <Tooltip bind:this={tooltip} data={hoveredData} {x} {y} id="2" {isHovered} />

  <!--svg-->
  <svg {width} {height}>
    <!--axis-->
    <CatCountChartAxis {catData} {width} {height} {margin} {xScale} {yScale} />
    <!--category rect group-->
    <g id="catGroup">
      {#each catData as d, i}
        <rect
          x={xScale(0)}
          y={yScale(d.name)}
          width={(xScale(d.count) - margin.left) * $tweenedRect}
          height={yScale.bandwidth()}
          fill={colorScale(d.name)}
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
            tooltip.mouseLeave();
            hoveredData = null;
          }}
          on:blur={(e) => {
            tooltip.mouseLeave();
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
  rect {
    /* control opacity transition */
    transition: opacity 500ms ease;
    cursor: pointer;
  }
</style>
