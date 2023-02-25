import Image from 'next/image';
import Box from '@mui/material/Box';

const Node = ({ node }) => {
  return (
    <Box sx={{ margin: 'auto', padding: 1, textAlign: 'center' }}>
      <Image
        title={node.name}
        src={node.image}
        height={64}
        width={64}
      />
      {node.name}
    </Box>
  );
}

// LeafNodes returns a list of Nodes.
const LeafNodes = ({ nodes }) => {
  return nodes.map(node => (
    <Node node={node} />
  ));
}

export default LeafNodes
