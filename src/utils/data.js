// create categorical data
let catData = [];
catData.push(
  ...Array.from({ length: 10 }, (e, i) => {
    return {
      name: `Category ${i + 1}`,
      pos: Number(Math.random().toFixed(2)),
      neg: Number((Math.random() * -1).toFixed(2)),
    };
  })
);

//create network data
let nodes = [];
let links = [];

let it = 0;
catData.map((_, i) => {
  //create a random number interval
  let num = Math.floor(Math.random() * 6 + 5);
  catData[i].count = num;

  //iterate over an array of that length and add nodes
  Array.from({ length: num }, (e, f) => {
    nodes.push({
      id: it,
      name: `Subcategory ${f + 1} / Category ${i + 1}`,
      group: i,
    });
    it++;
  });
});

catData.map((d, i) => {
  //create a random number to create # of links
  let num = Math.floor(Math.random() * 6 + 8);

  //filter to the selected group
  let filteredNodes = nodes.filter((g) => g.group === i);

  //iterate through and assign value
  Array.from({ length: num }, (e, f) => {
    let randomNum = Math.floor(Math.random() * filteredNodes.length);

    //if out of range, select index 0
    !filteredNodes[f] ? (f = 0) : null;

    //push values
    links.push({
      source: filteredNodes[f].id,
      target: filteredNodes[randomNum].id,
      value: 1,
    });
  });
});

const networkData = { nodes, links };

// https://transcripts.foreverdreaming.org/viewtopic.php?t=25301
const fullText = `<div class="content" style="height: auto !important; min-height: 0px !important;"><strong class="text-strong">Michael</strong>: All right Jim. Your quarterlies look very good. How are things at the library?<br>
<br>
<strong class="text-strong">Jim</strong>: Oh, I told you. I couldn't close it. So...<br>
<br>
<strong class="text-strong">Michael</strong>: So you've come to the master for guidance? Is this what you're saying, grasshopper?<br>
<br>
<strong class="text-strong">Jim</strong>: Actually, you called me in here, but yeah.<br>
<br>
<strong class="text-strong">Michael</strong>: All right. Well, let me show you how it's done.<br>

<hr>

<strong class="text-strong">Michael</strong>: [on the phone] Yes, I'd like to speak to your office manager, please. Yes, hello. This is Michael Scott. I am the Regional Manager of Dunder Mifflin Paper Products. Just wanted to talk to you manager-a-manger. [quick cut scene] All right. Done deal. Thank you very much, sir. You're a gentleman and a scholar. Oh, I'm sorry. OK. I'm sorry. My mistake. [hangs up] That was a woman I was talking to, so... She had a very low voice. Probably a smoker, so... [Clears throat] So that's the way it's done.<br>

<hr>

<strong class="text-strong">Michael</strong>: I've, uh, I've been at Dunder Mifflin for 12 years, the last four as Regional Manager. If you want to come through here... See we have the entire floor. So this is my kingdom, as far as the eye can see. This is our receptionist, Pam. Pam! Pam-Pam! Pam Beesly. Pam has been with us for... forever. Right, Pam?<br>
<br>
<strong class="text-strong">Pam</strong>: Well. I don't know.<br>
<br>
<strong class="text-strong">Michael</strong>: If you think she's cute now, you should have seen her a couple of years ago. [growls]<br>
<br>
<strong class="text-strong">Pam</strong>: What?<br>
<br>
<strong class="text-strong">Michael</strong>: Any messages?<br>
<br>
<strong class="text-strong">Pam</strong>: Uh, yeah. Just a fax.<br>
<br>
<strong class="text-strong">Michael</strong>: Oh! Pam, this is from Corporate. How many times have I told you? There's a special filing cabinet for things from corporate.<br>
<br>
<strong class="text-strong">Pam</strong>: You haven't told me.<br>
<br>
<strong class="text-strong">Michael</strong>: It's called the wastepaper basket! Look at that! Look at that face.<br>

<hr>

<strong class="text-strong">Michael</strong>: People say I am the best boss. They go, "God we've never worked in a place like this before. You're hilarious." "And you get the best out of us." [shows the camera his WORLD'S BEST BOSS mug] I think that pretty much sums it up. I found it at Spencer Gifts.<br>

<hr>

<strong class="text-strong">Dwight</strong>: [singing] Shall I play for you? Pa rum pump um pum [Imitates heavy drumming] I have no gifts for you. Pa rum pump um pum [Imitates heavy drumming]<br>

<hr>

<strong class="text-strong">Jim</strong>: My job is to speak to clients on the phone about... uh, quantities and type of copier paper. You know, whether we can supply it to them. Whether they can pay for it. And... I'm boring myself just talking about this.<br>
`;
export { catData, networkData, fullText };
