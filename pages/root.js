import Box from '@mui/material/Box';
import Item from '../components/item';
import Parents from '../components/parent';
import { groupBy } from '../lib/group-by';
import { debugNestedTreeNodes } from '../lib/debug-grouping';

const PrettyPrintJson = ({ data }) => {
  return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>);
}

export default function Root() {
  const attribute1 = 'frequency'
  const attribute2 = 'emotion'

  debugNestedTreeNodes(sourceNodes, attribute1, attribute2)

  const groupedBy1stAttribute = groupBy(sourceNodes, attribute1);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Item>
        Root
      </Item>
      <Parents attributeForGrouping={attribute2} groupedByParentNode={groupedBy1stAttribute}/>
      <PrettyPrintJson data={sourceNodes} />
    </Box>
  );
}

const sourceNodes = [
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
    name: 'sunglasses',
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
    name: 'sunglasses',
    emotion: 'Serious',
    frequency: 'Low',
  },
  {
    image: "/images/nodes/tired-face.svg",
    name: 'sunglasses',
    emotion: 'Serious',
    frequency: 'Low',
  },
  {
    image: "/images/nodes/face-with-spiral-eyes.svg",
    name: 'sunglasses',
    emotion: 'OMG',
    frequency: 'Low',
  },
  {
    image: "/images/nodes/thinking-face.svg",
    name: 'sunglasses',
    emotion: 'Serious',
    frequency: 'Low',
  },
]
