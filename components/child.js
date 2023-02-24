import Grid from '@mui/material/Grid';
import Item from './item.js';
import LeafNodes from './node.js';

// Children represents a Grid contaner that manages one or more child nodes.
export default function Children({ groupedByParentNode }) {
  return (
    <Item>
      <Grid container spacing={2}>
        {Object.keys(groupedByParentNode).map(parentNode => (
          <Grid key={parentNode} xs={12} md={6} lg={4}>
            <Item>
              {parentNode}
              <div style={styles.pin_container}>
                <LeafNodes nodes={groupedByParentNode[parentNode]} />
              </div>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Item>
  )
};

const styles = {
  pin_container: {
  width: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gridAutoRows: 'auto',
  justifyContent: 'center',
  }
}
