import { select, format } from "d3";

function tooltipGen() {
  return select("body")
    .append("div")
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .text("");
}

function tooltipFun(el, tooltip) {
  el.on("mouseenter", (e, v) => {
    tooltip
      .style("visibility", "visible")
      .text(
        `${v.name}\nCount: ${v.count}\nPositive: ${format(".0%")(
          v.pos
        )}\nNegative: ${format(".0%")(v.neg)}`
      );
  })
    .on("mousemove", (e) => {
      tooltip
        .style("top", `${e.pageY - 10}px`)
        .style("left", `${e.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden").text("");
    });
}

export { tooltipGen, tooltipFun };
