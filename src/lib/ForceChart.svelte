<script>
  import { schemeCategory10, map, sort } from "d3";
  import { select } from "d3-selection";
  import { scaleOrdinal } from "d3-scale";
  import { onMount } from "svelte";
  import { clickFun } from "../utils/force";
  import {
    forceManyBody,
    forceLink,
    forceSimulation,
    forceCenter,
  } from "d3-force";

  export let width;
  export let height;
  export let networkData;
  export let marker;

  // Copyright 2021 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/force-directed-graph

  let svg;
  let nodes = networkData.nodes;
  let links = networkData.links;
  let nodeId = (d) => d.id;
  let nodeGroup = (d) => d.group;
  let nodeTitle = (d) => `${d.id}\n${d.group}`;
  let linkStrokeWidth = (l) => Math.sqrt(l.value);
  let nodeStrength = -5;
  let linkStrength = 1;
  let colors = schemeCategory10;
  let linkSource = ({ source }) => source;
  let linkTarget = ({ target }) => target;
  let linkStroke = "#999"; // link stroke color
  let linkStrokeOpacity = 0.6; // link stroke opacity
  let linkStrokeLinecap = "round"; // link stroke linecap
  let nodeFill = "currentColor";
  let nodeStroke = "#fff"; // node stroke color
  let nodeStrokeWidth = 1.5; // node stroke width, in pixels
  let nodeStrokeOpacity = 1; // node stroke opacity
  let nodeRadius = 5; // node radius, in pixels

  function intern(value) {
    return value !== null && typeof value === "object"
      ? value.valueOf()
      : value;
  }

  //nodes
  const N = map(nodes, nodeId).map(intern);
  //link source
  const LS = map(links, linkSource).map(intern);
  //link target
  const LT = map(links, linkTarget).map(intern);
  //node title
  nodeTitle = (_, i) => N[i];
  //title
  const T = map(nodes, nodeTitle);
  //group
  const G = map(nodes, nodeGroup).map(intern);
  //linkstroke width
  const W = map(links, linkStrokeWidth);
  //linkstroke
  const L = typeof linkStroke !== "function" ? null : map(links, linkStroke);

  // Replace the input nodes and links with mutable objects for the simulation.
  nodes = map(nodes, (_, i) => ({ id: N[i] }));
  links = map(links, (_, i) => ({ source: LS[i], target: LT[i] }));

  // Compute default domains.
  let nodeGroups = sort(G);

  // Construct the scales.
  const color = nodeGroup == null ? null : scaleOrdinal(nodeGroups, colors);

  // Construct the forces.
  const forceNode = forceManyBody();
  const forceLinker = forceLink(links).id(({ index: i }) => N[i]);
  forceNode.strength(nodeStrength);
  forceLinker.strength(linkStrength);

  onMount(() => {
    //place ticked links
    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    //init svg
    svg = select(svg).append("g");

    //add links
    const link = svg
      .append("g")
      .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
      .attr("stroke-opacity", linkStrokeOpacity)
      .attr(
        "stroke-width",
        typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
      )
      .attr("stroke-linecap", linkStrokeLinecap)
      .selectAll("line")
      .data(links)
      .join("line");

    //add nodes
    const node = svg
      .append("g")
      .attr("fill", nodeFill)
      .attr("stroke", nodeStroke)
      .attr("stroke-opacity", nodeStrokeOpacity)
      .attr("stroke-width", nodeStrokeWidth)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .style("cursor", "pointer")
      .call(clickFun, networkData, marker);

    //add simulation
    const simulation = forceSimulation(nodes)
      .force("link", forceLinker)
      .force("charge", forceNode)
      .force("center", forceCenter())
      .on("tick", ticked);

    if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
    if (L) link.attr("stroke", ({ index: i }) => L[i]);
    if (G) node.attr("fill", ({ index: i }) => color(G[i]));
    if (T) node.append("title").text(({ index: i }) => T[i]);
  });
</script>

<svg {height} {width} viewBox={`0 0 ${height} ${width}`} bind:this={svg} />

<!-- style="max-width: 100%; height: auto; height: intrinsic" -->
