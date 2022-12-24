import { fullText } from "./data";
export function clickFun(d, i, marker) {
  //if it's a keypress and it's not the enter key, return
  if (d.type === "keydown" && d.key !== "Enter") {
    return;
  }

  //split words into an array
  let words = fullText.split(" ");

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
    className: `group-${i}`,
    accuracy: "exactly",
  });
}
