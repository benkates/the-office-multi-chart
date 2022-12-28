<script>
  export let headline;
  export let selectedChar;
  export let charData;

  $: o = headline
    ? [headline.source.id, headline.target.id, headline.value]
    : null;

  import { fade } from "svelte/transition";
  import { schemePaired } from "d3";
</script>

{#key o}
  <g id="headline" transition:fade={{ duration: 500 }}>
    <!-- if there is non-null data, render the headline -->
    {#if o}
      <text x="0" y="16" font-size="20">
        <!-- account for the yellow in the pallette -->
        <tspan
          fill={$selectedChar === 10 ? "grey" : schemePaired[$selectedChar]}
          text-decoration="underline"
          font-weight="bold">{o[0]}</tspan
        >
        <tspan> has said the name </tspan>
        <tspan
          fill={schemePaired[charData.findIndex((d) => d.name === o[1])]}
          text-decoration="underline"
          font-weight="bold"
          >{o[1]}
        </tspan>
        <tspan style="font-weight:bold;">{o[2]} times</tspan></text
      >
    {:else}<text x="0" y="15" font-size="16"
        ><tspan font-style="italic" fill="grey"
          >Hover/select a character to see relationships</tspan
        ></text
      >{/if}
  </g>
{/key}
