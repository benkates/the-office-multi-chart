<!--
  a lot of this code has been adapted from Mark Hughes (@happybeing) - cheers to you!

  https://github.com/happybeing/d3-fdg-svelte/blob/master/src/NetworkGraphSvelteSVG.svelte 
-->
<script>
  import { onMount } from "svelte";
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { schemePaired } from "d3";
  import { zoom, zoomIdentity } from "d3-zoom";
  import { select, selectAll } from "d3-selection";
  import { drag } from "d3-drag";
  import {
    forceSimulation,
    forceLink,
    forceManyBody,
    forceCenter,
  } from "d3-force";
  let d3 = {
    zoom,
    zoomIdentity,
    scaleLinear,
    scaleOrdinal,
    schemePaired,
    select,
    selectAll,
    drag,
    forceSimulation,
    forceLink,
    forceManyBody,
    forceCenter,
  };

  import { tweened } from "svelte/motion";

  import clickFun from "../utils/clickFun";
  import Tooltip from "../utils/Tooltip.svelte";
  import { selectedChar } from "../utils/stores";

  import marker from "../utils/mark";
  import ForceChartHeadline from "./ForceChartHeadline.svelte";

  export let networkData;
  export let charData;
  let svg;
  let width = 500;
  let height = 400;
  const nodeRadius = 25;
  const strength = -350;
  $: links = networkData.links;
  $: nodes = networkData.nodes;
  const colourScale = d3.scaleOrdinal(d3.schemePaired);
  let transform = d3.zoomIdentity;
  let simulation;

  // create headline text/output
  $: headline =
    $selectedChar >= 0 && $selectedChar !== null
      ? networkData.links.filter(
          (d) => d.source.id === charData[$selectedChar].name
        )[0]
      : null;

  //setup fade animation using tweened()
  //OnMountComp component does not work since there is other onMount funs going on
  const tweenedVal = tweened(0, {
    delay: 0,
    duration: 1250,
  });
  tweenedVal.set(1);

  let hoveredData, tooltip, isHovered, x, y;

  onMount(() => {
    simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(strength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", simulationUpdate);

    d3.select(svg).call(d3.zoom().scaleExtent([0.75, 3]).on("zoom", zoomed));
  });
  function simulationUpdate() {
    simulation.tick();
    nodes = [...nodes];
    links = [...links];
  }
  function zoomed(currentEvent) {
    transform = currentEvent.transform;
    simulationUpdate();
  }
</script>

<div bind:clientWidth={width}>
  <!-- svg -->
  <svg bind:this={svg} {width} {height} opacity={1 * $tweenedVal}>
    {#each links as link, i}
      <g stroke="#999" stroke-opacity="0.75">
        <!-- line including animated opacity -->
        <line
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          opacity={$selectedChar === null
            ? 0.075
            : $selectedChar === link.source.index
            ? 1
            : 0.075}
          stroke-width={/* $selectedChar === null
                        ? 1.5
                        : $selectedChar === link.source.index
                        ? 2.5
                      : 1.5*/
          link.value / 25}
          transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        >
          <title>{link.source.id}</title>
        </line>
      </g>
    {/each}

    <g id="nodes">
      {#each nodes as point, i}
        <!-- circle including animated features -->
        <circle
          class="node"
          r={$selectedChar === null
            ? nodeRadius * (2 / 3)
            : $selectedChar === i
            ? nodeRadius
            : nodeRadius * (2 / 3)}
          stroke="lightgrey"
          stroke-width="1"
          fill={colourScale(point.group)}
          cx={point.x}
          cy={point.y}
          opacity={() => {
            1; //$selectedChar === null ? 1 : $selectedChar === i ? 1 : 0.55}
          }}
          tabIndex="0"
          on:click={(d) => {
            clickFun(d, i, marker);
          }}
          on:keydown={(d) => {
            clickFun(d, i, marker);
          }}
          on:mouseover={(e) => {
            tooltip.mouseOver(e, i);
            hoveredData = charData[i];
          }}
          on:focus={(e) => {
            tooltip.mouseOver(e, i);
            hoveredData = charData[i];
          }}
          on:mouseleave={(e) => {
            tooltip.mouseLeave(e);
            hoveredData = null;
          }}
          on:blur={(e) => {
            tooltip.mouseLeave(e);
            hoveredData = null;
          }}
          transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        />
        <text
          x={point.x}
          y={point.y}
          text-anchor="middle"
          fill={[1, 5, 9, 11].includes(i) ? "lightgrey" : "black"}
          font-size={$selectedChar === null
            ? 11
            : $selectedChar === i
            ? 16
            : 11}
          transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
          dy=".3em"
          focusable="false"
          opacity={$selectedChar === null ? 1 : $selectedChar === i ? 1 : 0.85}
          >{point.name.length > 4 ? point.name.slice(0, 3) : point.name}</text
        >
      {/each}
    </g>
    <ForceChartHeadline {headline} {selectedChar} {charData} />
  </svg>
  <!-- tooltip -->
  <Tooltip
    bind:this={tooltip}
    data={hoveredData}
    {x}
    {y}
    id="3"
    {isHovered}
    float={false}
  />
</div>

<style>
  svg {
    float: left;
  }
  #nodes text {
    transition: opacity 500ms ease, font-size 500ms ease;
    pointer-events: none;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  #nodes circle {
    cursor: pointer;
    transition: opacity 500ms ease, r 500ms ease;
  }
  line {
    transition: opacity 500ms ease, stroke-width 500ms ease;
  }
</style>
