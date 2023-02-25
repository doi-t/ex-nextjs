import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Item from './item';
import LeafNodes from './node';
import AutoFillGrid from './auto-fill-grid';

// Children represents a Grid contaner that manages one or more child nodes.
export default function Children({ groupedByParentNode }) {
  return (
      <Grid container>
        {Object.keys(groupedByParentNode).map(parentNode => (
          <Grid key={parentNode} xs={12} sm={6} md={4} lg={3} xl={2} spacing={1} padding={1}>
            <Item>
              <Paper sx={{ bgcolor: "#DEE1F9", m: 0.5, color: 'gray' }}>
                {parentNode}
              </Paper>
              <AutoFillGrid>
                <LeafNodes nodes={groupedByParentNode[parentNode]} />
              </AutoFillGrid>
            </Item>
          </Grid>
        ))}
      </Grid>
  )
};
