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

const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.<br /><br /> Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque est.`;

export { catData, networkData, fullText };
