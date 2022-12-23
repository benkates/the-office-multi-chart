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
    <Tooltip data={hoveredData} {x} {y} id="2" />
  {/if}
  <svg {height} {width}>
    <PosNegChartAxis
      {catData}
      {width}
      {height}
      {margin}
      {xFullScale}
      {yScale}
    />
    <g id="posGroup">
      {#each catData as d}
        <rect
          x={width / 2 + margin.left / 2 - margin.right / 2}
          y={yScale(d.name)}
          width={xPosScale(d.pos) * $tweenedRect}
          height={yScale.bandwidth()}
          fill={"darkblue"}
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
