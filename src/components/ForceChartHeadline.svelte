<script>
  export let headlineOutput;
  export let selectedCat;

  import { characters } from "../data/characters";
  import { fade } from "svelte/transition";
  import { schemePaired } from "d3";
</script>

{#key headlineOutput}
  <g id="headline" transition:fade={{ duration: 500 }}>
    <text x="5" y="15">
      {#if headlineOutput}
        <tspan
          fill={$selectedCat === 10 ? "grey" : schemePaired[$selectedCat]}
          text-decoration="underline"
          font-weight="bold">{headlineOutput[0]}</tspan
        >
        <tspan> has said the name </tspan>
        <tspan
          fill={schemePaired[characters.indexOf(headlineOutput[1])]}
          text-decoration="underline"
          font-weight="bold"
          >{headlineOutput[1]}
        </tspan>
        <tspan style="font-weight:bold;">{headlineOutput[2]} times</tspan>
      {:else}<tspan font-style="italic"
          >Hover/select a character to see relationships</tspan
        >{/if}
    </text></g
  >
{/key}
