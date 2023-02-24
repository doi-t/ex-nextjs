import Image from 'next/image';

const styles = {
  // https://dev.to/anobjectisa/build-a-pinterest-layout-in-reactjs-1938
  node_image: {
    margin: 'auto',
  },
}

const Node = ({ node }) => {
  return (
    <div style={{
      ...styles.node_image,
    }}>
      <Image
        title={node.name}
        src={node.image}
        height={108}
        width={108}
      />
      {node.name}
    </div>
  );
}

// LeafNodes returns a list of Nodes.
const LeafNodes = ({ nodes }) => {
  return nodes.map(node => (
    <Node node={node} />
  ));
}

export default LeafNodes
