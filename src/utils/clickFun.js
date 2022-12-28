import charData from "../data/nodes.json";
export default function clickFun(d, i, marker) {
  //if it's a keypress and it's not the enter key, return
  if (d.type === "keydown" && d.key !== "Enter") {
    return;
  }

  let keyword = `^${charData[i].name}.*`;
  let reg = new RegExp(keyword);
  console.log(reg);

  marker.markRegExp(reg, {
    className: `group-${i}`,
    accuracy: "exactly",
  });
}
