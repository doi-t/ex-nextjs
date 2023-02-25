import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Item from './item';
import Children from './child';
import { groupBy } from '../lib/group-by';

// Parents represents a Grid contaner that manages one or more parent nodes.
export default function Parents({ attributeForGrouping, groupedByParentNode }) {
  return (
    <Grid container>
      {Object.keys(groupedByParentNode).map(parentNode => (
        <Grid key={parentNode} xs={12} spacing={1} padding={2}>
          <Item>
            <Paper sx={{ bgcolor: "#4559A9", color: "#FFFFFF" }}>
              {parentNode}
            </Paper>
            <Children groupedByParentNode={groupBy(groupedByParentNode[parentNode], attributeForGrouping)} />
          </Item>
        </Grid>
      ))}
    </Grid>
  )
};
