import { groupBy } from './group-by';

export function debugNestedTreeNodes(nodes, attribute1, attribute2) {
  console.log("Source Nodes:", JSON.stringify(nodes, null, 2));
  const groupedBy1stAttribute = groupBy(nodes, attribute1);
  console.log("groupedBy1stAttribute:", JSON.stringify(groupedBy1stAttribute, null, 2));
  Object.keys(groupedBy1stAttribute).map(parentNode1 => {
    console.log("Child nodes of 1st parent:", parentNode1, groupedBy1stAttribute[parentNode1]);
    const groupedBy2ndAttribute = groupBy(groupedBy1stAttribute[parentNode1], attribute2);
    console.log("groupedBy2ndAttribute:", JSON.stringify(groupedBy2ndAttribute, null, 2));
    Object.keys(groupedBy2ndAttribute).forEach(parentNode2 => {
      console.log("Child nodes of 1st parent:", parentNode1, parentNode2, groupedBy2ndAttribute[parentNode2]);
    });
  });
}
