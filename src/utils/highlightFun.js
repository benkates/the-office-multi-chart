import charData from "../data/nodes.json";
export default function highlightFun(d, i, marker) {
  //if it's a keypress and it's not the enter key, return
  if (d.type === "keydown" && d.key !== "Enter") {
    return;
  }

  // let keyword = `^(${charData[i].name}).*$`;
  let keyword = `(${charData[i].name}\\:).*`;

  marker.markRegExp(RegExp(keyword, "g"), {
    className: `group-${i}`,
    // accuracy: "exactly",
    acrossElements: true,
  });
}
