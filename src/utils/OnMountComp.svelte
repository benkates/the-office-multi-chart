<script>
  //Mounts a component when the DOM is ready.  Useful for intro animations.
  //https://github.com/FractalHQ/fractils/blob/main/src/lib/components/OnMount.svelte
  import { onMount } from "svelte";
  let loaded = false;
  onMount(() => {
    loaded = true;
  });
</script>

{#if loaded}
  <slot />
{/if}
