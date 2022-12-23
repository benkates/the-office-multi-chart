<script>
  import { schemeCategory10, max } from "d3";
  import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";

  import CatCountChartAxis from "./CatCountChartAxis.svelte";

  import Tooltip from "../utils/Tooltip.svelte";

  import { tweened } from "svelte/motion";
  import * as easings from "svelte/easing";

  export let margin;
  export let catData;

  let hoveredData;
  let width = 400;
  let height = 400;

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
  let isHovered, x, y;
  const mouseOver = (e) => {
    isHovered = true;
    x = e.layerX + 10;
    y = e.layerY + 10;
  };
  const mouseMove = (e) => {
    x = e.layerX + 10;
    y = e.layerY + 10;
  };
  const mouseLeave = () => {
    isHovered = false;
  };
</script>

<div bind:clientWidth={width}>
  {#if isHovered}
    <Tooltip data={hoveredData} {x} {y} id="1" />
  {/if}
  <svg {width} {height}>
    <CatCountChartAxis {catData} {width} {height} {margin} {xScale} {yScale} />
    <g id="posGroup">
      {#each catData as d}
        <rect
          x={xScale(0)}
          y={yScale(d.name)}
          width={(xScale(d.count) - margin.left) * $tweenedRect}
          height={yScale.bandwidth()}
          fill={colorScale(d.name)}
          on:focus={(e) => {
            mouseOver(e);
            hoveredData = d;
          }}
          on:mouseover={(e) => {
            mouseOver(e);
            hoveredData = d;
          }}
          on:mouseleave={mouseLeave}
          on:mousemove={mouseMove}
        />
      {/each}
    </g>
  </svg>
</div>
