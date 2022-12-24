import { fullText } from "./data";
export function clickFun(d, marker) {
  //split words into an array
  // @ts-ignore

  let words = fullText.split(" ");

  let i = Number(d.target.attributes["data-value"].value);

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
