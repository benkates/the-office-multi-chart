export function clickFun(el, networkData, marker) {
  //split words into an array
  // @ts-ignore
  let words = document.querySelector("#text-container").innerText.split(" ");
  el.on("click", (d, i) => {
    //get the group ID for the selected node
    let groupId = networkData.nodes[i.id].group;

    //get a random index of the array
    let indexNum = Math.floor(Math.random() * words.length);
    //get the actual keyword of that
    let keyword = words[indexNum];
    //randomly decide to add another word
    Math.round(Math.random()) === 1
      ? (keyword = `${keyword} ${words[indexNum + 1]}`)
      : null;

    //add mark
    marker.mark(keyword, {
      className: `group-${groupId}`,
      accuracy: "exactly",
    });
  });
}
