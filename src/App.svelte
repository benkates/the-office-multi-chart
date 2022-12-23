<script>
  import { schemeCategory10 } from "d3"; //shows as not used, see <style>
  import PosNegChart from "./lib/PosNegChart.svelte";
  import CatCountChart from "./lib/CatCountChart.svelte";
  import { catData, networkData } from "./utils/data";
  import ForceChart from "./lib/ForceChart.svelte";
  import mark from "mark.js";

  let marker = new mark("#text-container");

  import {
    Col,
    Container,
    Row,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
  } from "sveltestrap";

  let style = schemeCategory10
    .map((e, i) => {
      return `.group-${i} {background-color: ${e}99;border-radius: 2px;}`;
    })
    .join(" ");

  let width, height;
  width = "400";
  height = "400";

  let width2;
</script>

<main>
  <Container>
    <h1 style="padding-top:10px">Multi-Chart Example (Svelte)</h1>
    <p>
      This is a proof of concept multi-chart tool using randomly generated data
    </p>
    <Row noGutters={false} class="gy-3">
      <Col xs="12" lg="6">
        <Card>
          <CardHeader
            ><CardTitle>What does count look like by category?</CardTitle
            ></CardHeader
          >
          <CardBody>
            <CatCountChart {catData} />
          </CardBody>
        </Card>
      </Col>
      <Col xs="12" lg="6">
        <Card>
          <CardHeader>
            <CardTitle
              >What does sentiment look like? negative vs. positive</CardTitle
            >
          </CardHeader>
          <CardBody>
            <PosNegChart {catData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
    <br />
    <Row noGutters={false} class="gy-3">
      <Col xs="12" lg="6">
        <Card>
          <CardHeader>
            <CardTitle>What does the network look like by category?</CardTitle>
          </CardHeader>
          <CardBody>
            <ForceChart {width} {height} {networkData} {marker} />
          </CardBody>
        </Card>
      </Col>
      <Col xs="12" lg="6">
        <Card>
          <CardHeader
            ><CardTitle>Select a node to highlight the text</CardTitle
            ></CardHeader
          >
          <CardBody id="text-container">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. At vero eos
            et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas
            molestias excepturi sint occaecati cupiditate non provident,
            similique sunt in culpa qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga.<br /><br /> Et harum quidem rerum facilis est
            et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
            optio cumque nihil impedit quo minus id quod maxime placeat facere possimus,
            omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
            quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
            ut et voluptates repudiandae sint et molestiae non recusandae itaque
            est.
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
</main>

<!-- dynamically generate each class style -->
{@html `<style>${style}</style>`}
