<script>
  import { schemeCategory10 } from "d3";
  import PosNegChart from "./PosNegChart.svelte";
  import CatCountChart from "./CatCountChart.svelte";
  import { width, height, margin } from "./utils/dims";
  import { catData, networkData } from "./data";
  import ForceChart from "./ForceChart.svelte";
  import mark from "mark.js";

  let marker = new mark("#text-container");

  let textStyle = schemeCategory10
    .map((e, i) => {
      return `.group-${i} {background-color: ${e}99;border-radius: 2px;}`;
    })
    .join(" ");
</script>

<main>
  <PosNegChart {width} {height} {margin} {catData} />
  <CatCountChart {width} {height} {margin} {catData} />
  <ForceChart {width} {height} {networkData} {marker} />

  <div id="text-container">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
    praesentium voluptatum deleniti atque corrupti quos dolores et quas
    molestias excepturi sint occaecati cupiditate non provident, similique sunt
    in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
    fuga.<br /><br /> Et harum quidem rerum facilis est et expedita distinctio. Nam
    libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
    minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
    dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
    necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non
    recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
    voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
  </div>
</main>

{@html `<style>${textStyle}</style>`}
