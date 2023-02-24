import Grid from '@mui/material/Grid';
import Item from './item';
import Children from './child';
import { groupBy } from '../lib/group-by';

// Children represents a Grid contaner that manages one or more child nodes.
export default function Parents({ attributeForGrouping, groupedByParentNode }) {
  return (
      <Item>
        <Grid container spacing={2}>
          {Object.keys(groupedByParentNode).map(parentNode => (
            <Grid key={parentNode} xs={12}>
              <Item>{parentNode}</Item>
              <Children groupedByParentNode={groupBy(groupedByParentNode[parentNode], attributeForGrouping)} />
            </Grid>
          ))}
        </Grid>
      </Item>
  )
};
