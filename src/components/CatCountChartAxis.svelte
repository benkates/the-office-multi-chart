<script>
  import { format } from "d3";

  export let catData;
  export let height;
  export let width;
  export let margin;
  export let xScale;
  export let yScale;

  import { max, range } from "d3";

  // let maxVal = max(catData.map((e) => e.count + 1));
  let xTicks = xScale.ticks(5);
  let yTicks = catData.map((e) => e.name);
</script>

<g id="axes">
  <g id="axis-x" transform="translate(0, {height - margin.bottom})">
    {#each xTicks as tick}
      <g
        transform="translate({xScale(tick)}, 0)"
        dominant-baseline="hanging"
        font-size="12px"
      >
        <line stroke="lightgrey" y2={-height} />
        <text fill="grey" dy="5" text-anchor="middle">{format(",")(tick)}</text>
      </g>
    {/each}
  </g>
  <g id="axis-y" transform="translate(-5, 0)">
    {#each yTicks as tick}
      <g
        transform="translate({margin.left}, {yScale(tick) +
          yScale.bandwidth() / 2})"
        dominant-baseline="middle"
        font-size="14px"
      >
        <line stroke="lightgrey" x2={width} />
        <text fill="grey" text-anchor="end" dx="-2">{tick}</text>
      </g>
    {/each}
  </g>
</g>
