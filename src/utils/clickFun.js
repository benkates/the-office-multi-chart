import catData from "../data/nodes.json";
export default function clickFun(d, i, marker) {
  //if it's a keypress and it's not the enter key, return
  if (d.type === "keydown" && d.key !== "Enter") {
    return;
  }

  let keyword = catData[i].name;

  marker.mark(keyword, {
    className: `group-${i}`,
    accuracy: "exactly",
  });
}
