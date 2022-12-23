<script>
  import { scaleLinear, scaleBand } from "d3-scale";
  import { axisBottom, axisLeft } from "d3-axis";
  import { select } from "d3-selection";
  import { format } from "d3-format";
  import { tooltipFun, tooltipGen } from "../utils/tooltip";
  import { onMount } from "svelte";

  export let width;
  export let height;
  export let margin;
  export let catData;

  let svg;

  //setup x positive scale
  const xPosScale = scaleLinear()
    .domain([0, 1])
    .rangeRound([0, width / 2 - margin.right * 2]);

  //setup x negative scale
  const xNegScale = scaleLinear()
    .domain([0, -1])
    .rangeRound([width / 2 - margin.left, margin.left]);
  //setup y scale
  const yScale = scaleBand()
    .domain(catData.map((e) => e.name))
    .rangeRound([margin.top, height - margin.bottom])
    .paddingInner(0.25);

  //setup full scale for axis
  const xFullScale = scaleLinear()
    .domain([-1, 1])
    .rangeRound([margin.left, width - margin.right]);

  //setup x axis
  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      //call axisBottom and styling
      .call(
        axisBottom(xFullScale)
          .tickValues([-1, -0.5, 0, 0.5, 1])
          .tickFormat(format(",.0%"))
          .tickSize(-height)
      )
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

  onMount(() => {
    //add axes
    svg = select(svg).append("g");
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    //blue bars
    // svg
    //   .append("g")
    //   .attr("id", "posGroup")
    //   .selectAll("rect")
    //   .data(catData)
    //   .join("rect")
    //   .attr("x", width / 2 + margin.right - 12.5)
    //   .attr("y", (d) => yScale(d.name))
    //   .attr("width", (d) => xPosScale(0))
    //   .attr("height", yScale.bandwidth())
    //   .attr("fill", "darkblue")
    //   .call(tooltipFun, tooltip)
    //   .transition()
    //   .duration(1500)
    //   .attr("width", (d) => xPosScale(d.pos) + 12.5);

    //red bars
    svg
      .append("g")
      .attr("id", "negGroup")
      .selectAll("rect")
      .data(catData)
      .join("rect")
      .attr("x", (d) => xNegScale(0) + width / 2 - margin.left)
      .attr("y", (d) => yScale(d.name))
      .attr("width", 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", "red")
      .call(tooltipFun, tooltip)
      .transition()
      .duration(1500)
      .attr("x", (d) => xNegScale(d.neg))
      .attr("width", (d) => width / 2 - xNegScale(d.neg));

    /*
  const bar = svg.append("g")
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("fill", i => colors[X[i] > 0 ? colors.length - 1 : 0])
      .attr("x", i => Math.min(xScale(0), xScale(X[i])))
      .attr("y", i => yScale(Y[i]))
      .attr("width", i => Math.abs(xScale(X[i]) - xScale(0)))
      .attr("height", yScale.bandwidth());
      */
  });
</script>

<svg {height} {width} bind:this={svg} />
