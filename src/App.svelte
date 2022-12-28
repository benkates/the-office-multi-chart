<script>
  import { schemePaired } from "d3"; //shows as not used, see <style>
  import PosNegChart from "./components/PosNegChart.svelte";
  import CharCountChart from "./components/CharCountChart.svelte";
  import ForceChart from "./components/ForceChart.svelte";
  import marker from "./utils/mark";

  import charData from "./data/nodes.json";
  import links from "./data/links.json";
  let nodes = charData.map((e, i) => {
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
    CardSubtitle,
  } from "sveltestrap";

  import OnMountComp from "./utils/OnMountComp.svelte";
  import { fade } from "svelte/transition";

  import "iconify-icon";
  import TextResetButton from "./utils/TextResetButton.svelte";
  import CharSelect from "./utils/CharSelect.svelte";

  import { selectedTranscript } from "./utils/stores";
  import { scripts } from "./data/scripts";
  import { beforeUpdate } from "svelte";

  // define color scheme for highlights
  let style = schemePaired
    .map((e, i) => {
      return `.group-${i} {background-color: ${e}99;padding:.1em 0;}`;
    })
    .join(" ");

  let width = "400";
  let height = "400";
</script>

<Container>
  <header>
    <h1 style="padding-top:10px">
      <img
        src="the-office-logo.png"
        alt="The Office"
        width="180em"
        style="display:inline;vertical-align:middle;padding-bottom:0.25em"
      />
      Multi-Chart (in Svelte!)
    </h1>
    <p style="font-style:italic;">by Ben Kates / Dec 2022</p>
    <p style="font-style:italic;">
      This is a proof of concept multi-chart tool using <a
        href="https://data.world/abhinavr8/the-office-scripts-dataset"
        target="_blank"
        rel="noreferrer">The Office TV show transcripts</a
      >. Hover on chart elements to toggle prominence across charts.
      <br /><strong
        >Click on a character to highlight their name in the transcript!</strong
      >
    </p>
  </header>
  <main>
    <section>
      <!-- character, CharCountChart -->
      <Row noGutters={false} class="gy-3">
        <!-- CharCountChart -->
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
              <CardSubtitle style="font-style:italic; color:grey;"
                >All data based on 201 regular episodes over 9 seasons</CardSubtitle
              >
              <CharCountChart {charData} />
            </CardBody>
          </Card>
        </Col>
        <!-- pos/neg, PosNegChart -->
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <CardTitle
                ><iconify-icon
                  inline
                  icon="ic:sharp-sentiment-very-satisfied"
                />
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
              <CardSubtitle style="font-style:italic; color:grey;"
                >Based on <a
                  href="https://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html"
                  target="_blank"
                  rel="noreferrer"
                  style="color:grey;">Bing lexicon</a
                >; words outside of lexicon counted as neutral</CardSubtitle
              >
              <PosNegChart {charData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </section>
    <br />
    <section>
      <Row noGutters={false} class="gy-3 justify-content-center">
        <Col xs="12" lg="8">
          <Card>
            <CardHeader>
              <CardTitle
                ><iconify-icon inline icon="fa6-solid:circle-nodes" /> Which
                character is <strong>talking about</strong> others by
                <strong>name</strong>?</CardTitle
              >
            </CardHeader>
            <CardBody>
              <ForceChart {networkData} {charData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </section>
    <section>
      <Row noGutters={false} class="gy-3" style="padding-top:25px">
        <Col xs="12">
          <Card>
            <CardHeader
              ><CardTitle
                ><iconify-icon
                  inline
                  icon="material-symbols:text-snippet-outline-sharp"
                />
                Select a <strong>character from the dropdown</strong> to view
                the episode in which they <strong>speak the most</strong><br />
                <Row style="padding-top:5px;"
                  ><Col md="8" lg="3">
                    <CharSelect {marker} />
                  </Col>
                  <Col md="4" lg="9" style="padding-top:4px">
                    <TextResetButton {marker} /></Col
                  ></Row
                >
              </CardTitle>
            </CardHeader>
            <CardBody id="text-container" style="height:400px;overflow-y:auto;">
              <div transition:fade={{ duration: 1250 }}>
                <h2>
                  {@html scripts.filter(
                    (d) => d.character === $selectedTranscript
                  )[0].episode}
                </h2>
                {@html scripts.filter(
                  (d) => d.character === $selectedTranscript
                )[0].text}
                <div class="div-fade" />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </section>
  </main>
  <br />
  <footer>
    <p style="text-align:center; font-style:italic;">
      Data cleaning/prep completed in R. Find the app code on <a
        href="https://github.com/benkates/multi-chart-svelte"
        target="_blank"
        rel="noreferrer">GitHub here</a
      >!
    </p>
  </footer>
</Container>

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
  .div-fade {
    position: absolute;
    bottom: 0px;

    display: block;
  
    width: 100%;
    height: 75px;
  
    background-image: linear-gradient(to bottom, 
        rgba(255, 255, 255, 0), 
        rgba(255, 255, 255, 0.9)
    100%);
}
  ${style}
</style>`}
