<script>
  import { scaleLinear, scaleBand } from "d3-scale";
  import { axisBottom, axisLeft } from "d3-axis";
  import { select } from "d3-selection";
  import { format } from "d3-format";
  import { tooltipFun, tooltipGen } from "../utils/tooltip";
  import { onMount } from "svelte";

  import PosNegChartAxis from "./PosNegChartAxis.svelte";

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

  const tweenedRect = tweened(0, {
    delay: 0,
    duration: 1250,
    easing: easings.cubicOut,
  });
  tweenedRect.set(1);

  console.log(catData.map((e) => e.neg));

  //define tooltip
  const tooltip = tooltipGen();
</script>

<div bind:clientWidth={width}>
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
        />
      {/each}
    </g>
  </svg>
</div>
