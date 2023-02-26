import Box from '@mui/material/Box';
import Item from '../components/item';
import Parents from '../components/parent';
import { groupBy } from '../lib/group-by';
import { debugNestedTreeNodes } from '../lib/debug-grouping';

const PrettyPrintJson = ({ data }) => {
  return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>);
}

export default function Root() {
  const parentAttribute = data.parentAttribute
  const childAttribute = data.childAttribute

  // debugNestedTreeNodes(data.sourceNodes, parentAttribute, childAttribute)

  const groupedBy1stAttribute = groupBy(data.sourceNodes, parentAttribute);

  return (
    <Box sx={{ padding: 1, margin: 1 }}>
      <Item>
        <h1>Root</h1>
        <Parents attributeForGrouping={childAttribute} groupedByParentNode={groupedBy1stAttribute} />
      </Item>
    </Box>
  );
}

const data = {
  parentAttribute: "frequency",
  childAttribute: "emotion",
  sourceNodes: [
    {
      image: "/images/nodes/smiling-face-with-sunglasses.svg",
      name: 'Sunglasses',
      emotion: 'Fun',
      frequency: 'High',
    },
    {
      image: "/images/nodes/rolling-on-the-floor-laughing.svg",
      name: 'Laughing',
      emotion: 'Fun',
      frequency: 'High',
    },
    {
      image: "/images/nodes/face-screamingin-fear.svg",
      name: 'Screaming',
      emotion: 'OMG',
      frequency: 'Low',
    },
    {
      image: "/images/nodes/fear-face.svg",
      name: 'Fear',
      emotion: 'OMG',
      frequency: 'Low',
    },
    {
      image: "/images/nodes/star-struck.svg",
      name: 'Star',
      emotion: 'Fun',
      frequency: 'High',
    },
    {
      image: "/images/nodes/money-mouth-face.svg",
      name: 'Money',
      emotion: 'Serious',
      frequency: 'Low',
    },
    {
      image: "/images/nodes/tired-face.svg",
      name: 'Tired',
      emotion: 'Serious',
      frequency: 'Low',
    },
    {
      image: "/images/nodes/face-with-spiral-eyes.svg",
      name: 'Spiral Eyes',
      emotion: 'OMG',
      frequency: 'Low',
    },
    {
      image: "/images/nodes/thinking-face.svg",
      name: 'Thinking',
      emotion: 'Serious',
      frequency: 'Low',
    },
  ]
}
