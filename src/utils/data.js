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

export { catData, networkData };
