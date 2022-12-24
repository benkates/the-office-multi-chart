<script>
  import { schemeCategory10 } from "d3"; //shows as not used, see <style>
  import PosNegChart from "./components/PosNegChart.svelte";
  import CatCountChart from "./components/CatCountChart.svelte";
  import { catData, networkData, fullText } from "./utils/data";
  import ForceChart from "./components/ForceChart.svelte";
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

  import "iconify-icon";

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
    <!-- header -->
    <h1 style="padding-top:10px">
      <iconify-icon inline icon="mdi:page-layout-header-footer" />
      Multi-Chart Example (Svelte)
    </h1>
    <p>
      This is a proof of concept multi-chart tool using randomly generated data
    </p>
    <!-- category, CatCountChart -->
    <Row noGutters={false} class="gy-3">
      <Col xs="12" lg="6">
        <Card>
          <CardHeader
            ><CardTitle
              ><iconify-icon inline icon="ic:outline-category" /> What does count
              look like by category?</CardTitle
            ></CardHeader
          >
          <CardBody>
            <CatCountChart {catData} {marker} />
          </CardBody>
        </Card>
      </Col>
      <!-- pos/neg, PosNegChart -->
      <Col xs="12" lg="6">
        <Card>
          <CardHeader>
            <CardTitle
              ><iconify-icon inline icon="ic:sharp-sentiment-very-satisfied" />
              What does sentiment look like?
              <span class="inline-label" style="background:red;">negative</span>
              vs.
              <span class="inline-label" style="background:darkblue;"
                >positive</span
              ></CardTitle
            >
          </CardHeader>
          <CardBody>
            <PosNegChart {catData} {marker} />
          </CardBody>
        </Card>
      </Col>
    </Row>
    <br />
    <Row noGutters={false} class="gy-3">
      <!-- force, ForceChart -->
      <Col xs="12" lg="6">
        <Card>
          <CardHeader>
            <CardTitle
              ><iconify-icon inline icon="fa6-solid:circle-nodes" /> What does the
              network look like by category?</CardTitle
            >
          </CardHeader>
          <CardBody>
            <ForceChart {networkData} {marker} />
          </CardBody>
        </Card>
      </Col>
      <!-- text,fullText -->
      <Col xs="12" lg="6">
        <Card>
          <CardHeader
            ><CardTitle
              ><iconify-icon
                inline
                icon="material-symbols:text-snippet-outline-sharp"
              /> Select a node or category to highlight some random text</CardTitle
            ></CardHeader
          >
          <CardBody id="text-container">
            {@html fullText}
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
  <br />
</main>

<!-- dynamically generate each class style for the text highlight -->
{@html `<style>
    .inline-label {
    color:white;
    padding:3px;
    border-radius:4px;
    font-weight:bold;
  }
  ${style}</style>`}
