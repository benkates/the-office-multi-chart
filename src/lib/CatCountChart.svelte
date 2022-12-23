<script>
  import { schemeCategory10, max } from "d3";
  import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";
  import { select } from "d3-selection";
  import { axisBottom, axisLeft } from "d3-axis";

  import { tooltipFun, tooltipGen } from "../utils/tooltip";
  import { onMount } from "svelte";

  export let width;
  export let height;
  export let margin;
  export let catData;

  let svg;

  //setup x positive scale
  const xScale = scaleLinear()
    .domain([0, max(catData, (d) => d.count)])
    .rangeRound([margin.left, width - margin.right]);

  //setup y scale
  const yScale = scaleBand()
    .domain(catData.map((e) => e.name))
    .rangeRound([margin.top, height - margin.bottom])
    .paddingInner(0.25);

  //setup color scale
  const colorScale = scaleOrdinal(
    catData.map((e) => e.name),
    schemeCategory10
  );

  //setup x axis
  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      //call axisBottom and styling
      .call(axisBottom(xScale).tickSize(-height))
      //remove bottom line
      .call((g) => g.select(".domain").remove())
      .attr("font-size", "12")
      .attr("color", "grey")
      .selectAll("line")
      .attr("color", "lightgrey");

  //binned axis
  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(yScale).tickSize(-width))
      .call((g) => g.select(".domain").remove())
      .attr("font-size", "14")
      .attr("color", "grey")
      .selectAll("line")
      .attr("color", "lightgrey");

  //define tooltip
  const tooltip = tooltipGen();

  //create svg container
  //   const svg = create("svg").attr("viewBox", [0, 0, width, height]);
  onMount(() => {
    svg = select(svg).append("g");
    //add axes
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    //categorical bars
    svg
      .append("g")
      .attr("id", "posGroup")
      .selectAll("rect")
      .data(catData)
      .join("rect")
      .attr("x", (d) => xScale(0))
      .attr("y", (d) => yScale(d.name))
      .attr("width", (d) => 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.name))
      .call(tooltipFun, tooltip)
      .transition()
      .duration(1500)
      .attr("width", (d) => xScale(d.count) - margin.left);
  });
</script>

<svg {height} {width} bind:this={svg} />
