<!--
  a lot of this code has been copied from Mark Hughes (happybeing) - cheers to you!

  https://github.com/happybeing/d3-fdg-svelte/blob/master/src/NetworkGraphSvelteSVG.svelte 
-->
<script>
  import { onMount } from "svelte";
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { zoom, zoomIdentity } from "d3-zoom";
  import { schemeCategory10 } from "d3-scale-chromatic";
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
    schemeCategory10,
    select,
    selectAll,
    drag,
    forceSimulation,
    forceLink,
    forceManyBody,
    forceCenter,
  };

  import { tweened } from "svelte/motion";

  import { clickFun } from "../utils/clickFun";
  export let marker;

  export let networkData;
  let svg;
  let width = 500;
  let height = 400;
  const nodeRadius = 5;
  $: links = networkData.links.map((d) => Object.create(d));
  $: nodes = networkData.nodes.map((d) => Object.create(d));
  const colourScale = d3.scaleOrdinal(d3.schemeCategory10);
  let transform = d3.zoomIdentity;
  let simulation;

  //setup fade animation using tweened()
  //OnMountComp component does not work since there is other onMount funs going on
  const tweenedVal = tweened(0, {
    delay: 0,
    duration: 1250,
  });
  tweenedVal.set(1);

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

    // d3.select(nodes).call(clickFun, networkData, marker);
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

  function resize() {
    ({ width, height } = svg.getBoundingClientRect());
  }
</script>

<svelte:window on:resize={resize} />

<!-- SVG was here -->

<div bind:clientWidth={width}>
  <svg bind:this={svg} {width} {height} opacity={1 * $tweenedVal}>
    {#each links as link}
      <g stroke="#999" stroke-opacity="0.75">
        <line
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          stroke-width="1.25"
          transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        >
          <title>{link.source.id}</title>
        </line>
      </g>
    {/each}

    <g>
      {#each nodes as point}
        <circle
          class="node"
          r="5"
          fill={colourScale(point.group)}
          cx={point.x}
          cy={point.y}
          tabIndex="0"
          on:click={(d) => {
            clickFun(d, marker);
          }}
          on:keydown={(d) => {
            clickFun(d, marker);
          }}
          data-value={point.group}
          transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        >
          <title>{point.id}</title></circle
        >
      {/each}
    </g>
  </svg>
  <!-- </OnMountComp> -->
</div>

<style>
  svg {
    float: left;
  }
  circle {
    stroke: #fff;
    stroke-width: 1.5;
    cursor: pointer;
  }
</style>
