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
  import { selectedCat } from "../utils/stores";

  import marker from "../utils/mark";

  export let networkData;
  export let catData;
  let svg;
  let width = 500;
  let height = 400;
  const nodeRadius = 5;
  $: links = networkData.links.map((d) => Object.create(d));
  $: nodes = networkData.nodes.map((d) => Object.create(d));
  const colourScale = d3.scaleOrdinal(d3.schemePaired);
  let transform = d3.zoomIdentity;
  let simulation;

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
          .distance(30)
      )
      .force("charge", d3.forceManyBody().strength(-10))
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
  <!-- tooltip -->
  <Tooltip bind:this={tooltip} data={hoveredData} {x} {y} id="3" {isHovered} />
  <!-- svg -->
  <svg bind:this={svg} {width} {height} opacity={1 * $tweenedVal}>
    {#each links as link}
      <g stroke="#999" stroke-opacity="0.75">
        <!-- line including animated opacity -->
        <line
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          opacity={$selectedCat === null
            ? 1
            : $selectedCat === link.source.group
            ? 1
            : 0.35}
          stroke-width={$selectedCat === null
            ? 1.5
            : $selectedCat === link.source.group
            ? 2.5
            : 1.5}
          transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        >
          <title>{link.source.id}</title>
        </line>
      </g>
    {/each}

    <g>
      {#each nodes as point}
        <!-- circle including animated features -->
        <circle
          class="node"
          r={$selectedCat === null ? 5 : $selectedCat === point.group ? 7 : 5}
          fill={colourScale(point.group)}
          cx={point.x}
          cy={point.y}
          opacity={$selectedCat === null
            ? 1
            : $selectedCat === point.group
            ? 1
            : 0.55}
          tabIndex="0"
          on:click={(d) => {
            clickFun(d, point.group, marker);
          }}
          on:keydown={(d) => {
            clickFun(d, point.group, marker);
          }}
          on:mouseover={(e) => {
            tooltip.mouseOver(e, point.group);
            hoveredData = catData[point.group];
          }}
          on:focus={(e) => {
            tooltip.mouseOver(e, point.group);
            hoveredData = catData[point.group];
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
        >
          <title>Category: {point.group + 1}</title></circle
        >
      {/each}
    </g>
  </svg>
</div>

<style>
  svg {
    float: left;
  }
  circle {
    stroke: #fff;
    stroke-width: 1.5;
    cursor: pointer;
    transition: opacity 500ms ease, r 500ms ease;
  }
  line {
    transition: opacity 500ms ease, stroke-width 500ms ease;
  }
</style>
