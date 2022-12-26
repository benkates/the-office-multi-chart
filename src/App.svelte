<script>
  import { schemePaired } from "d3"; //shows as not used, see <style>
  import PosNegChart from "./components/PosNegChart.svelte";
  import CatCountChart from "./components/CatCountChart.svelte";
  import { fullText } from "./utils/data";
  import ForceChart from "./components/ForceChart.svelte";
  import marker from "./utils/mark";

  import catData from "./data/nodes.json";
  import links from "./data/links.json";
  let nodes = catData.map((e, i) => {
    return { id: e.name, group: e.name, name: e.name };
  });
  let networkData = { nodes, links };

  import {
    Col,
    Container,
    Row,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
  } from "sveltestrap";

  import OnMountComp from "./utils/OnMountComp.svelte";
  import { fade } from "svelte/transition";

  import "iconify-icon";
  import TextResetButton from "./utils/TextResetButton.svelte";
  import CharSelect from "./utils/CharSelect.svelte";

  import { selectedTranscript } from "./utils/stores";
  import { scripts } from "./data/scripts";
  console.log(scripts);

  let style = schemePaired
    .map((e, i) => {
      return `.group-${i} {background-color: ${e}99;border-radius: 2px;}`;
    })
    .join(" ");

  let width = "400";
  let height = "400";
</script>

<main>
  <Container>
    <!-- header -->
    <h1 style="padding-top:10px">
      <iconify-icon inline icon="mdi:page-layout-header-footer" />
      The Office Dataset Multi-Chart (Using Svelte!)
    </h1>
    <p style="font-style:italic;">
      This is a proof of concept multi-chart tool using The Office TV show
      transcripts. Hover on chart elements to toggle prominence across charts.
      <br />Click on a character to highlight their name in the transcript below
      the charts!
    </p>
    <!-- category, CatCountChart -->
    <Row noGutters={false} class="gy-3">
      <Col xs="12" lg="6">
        <Card>
          <CardHeader
            ><CardTitle
              ><iconify-icon inline icon="mdi:person-tie" /> What does
              <strong>word count</strong> look like by
              <strong>character?</strong></CardTitle
            ></CardHeader
          >
          <CardBody>
            <CatCountChart {catData} />
          </CardBody>
        </Card>
      </Col>
      <!-- pos/neg, PosNegChart -->
      <Col xs="12" lg="6">
        <Card>
          <CardHeader>
            <CardTitle
              ><iconify-icon inline icon="ic:sharp-sentiment-very-satisfied" />
              What does <strong>sentiment</strong> look like?
              <span style="font-size:0.85em"
                ><span class="inline-label" style="background:red;"
                  >negative</span
                >
                vs.
                <span class="inline-label" style="background:darkblue;"
                  >positive</span
                ></span
              ></CardTitle
            >
          </CardHeader>
          <CardBody>
            <PosNegChart {catData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
    <br />
    <Row noGutters={false} class="gy-3 justify-content-center">
      <!-- force, ForceChart -->
      <Col xs="12" lg="6">
        <Card>
          <CardHeader>
            <CardTitle
              ><iconify-icon inline icon="fa6-solid:circle-nodes" /> Which
              character is <strong>referencing</strong> others by
              <strong>name</strong>?</CardTitle
            >
          </CardHeader>
          <CardBody>
            <ForceChart {networkData} {catData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
    <br />
    <!-- text,fullText -->
    <Row noGutters={false} class="gy-3">
      <Col lg="12">
        <Card>
          <CardHeader
            ><CardTitle
              ><iconify-icon
                inline
                icon="material-symbols:text-snippet-outline-sharp"
              />
              Select a <strong>character from the dropdown</strong> to view the
              episode in which they <strong>speak the most</strong><br />
              <Row style="padding-top:5px"
                ><Col xs="8" lg="6">
                  <CharSelect />
                </Col>
                <Col xs="4" lg="6" style="padding-top:4px">
                  <TextResetButton {marker} /></Col
                ></Row
              >
            </CardTitle>
          </CardHeader>
          <CardBody id="text-container" style="height:400px;overflow-y:auto;">
            <OnMountComp>
              <div transition:fade={{ duration: 1250 }}>
                <h2>
                  {@html scripts.filter(
                    (d) => d.character === $selectedTranscript
                  )[0].episode}
                </h2>
                {@html scripts.filter(
                  (d) => d.character === $selectedTranscript
                )[0].text}
              </div>
            </OnMountComp>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <br />
    <p style="text-align:center; font-style:italic;">
      Find the code on <a
        href="https://github.com/benkates/multi-chart-svelte"
        target="_blank"
        rel="noreferrer">GitHub here</a
      >!
    </p>
  </Container>
</main>

<!-- dynamically generate each class style for the text highlight -->
{@html `<style>
  .card-title {
    margin-bottom:0;
  }

  .inline-label {
    color:white;
    padding:3px;
    border-radius:4px;
    font-weight:bold;
  }
  ${style}
</style>`}
