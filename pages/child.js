import Item from '../components/item.js';
import Box from '@mui/material/Box';
import Children from '../components/child.js';

export default function MyChildren() {
  return (
    <Box>
      <Item>
        Children
      </Item>
      <Children groupedByParentNode={groupedByParentNode} />
    </Box>
  )
};

const groupedByParentNode = {
  "High": [
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
  ],
  "Low": [
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
