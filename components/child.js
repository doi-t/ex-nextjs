import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import LeafNodes from './node';
import AutoFillGrid from './auto-fill-grid';

// Children represents a Grid contaner that manages one or more child nodes.
export default function Children({ groupedByParentNode }) {

  function addNode() {
    console.log("Add a new Node.")
  }

  return (
    <Grid container>
      {Object.keys(groupedByParentNode).map(parentNode => (
        <Grid key={parentNode} xs={12} sm={6} md={4} lg={3} xl={2} padding={1}>
          <Card sx={{}}>
            <CardHeader
              action={
                <IconButton onClick={addNode} aria-label="settings">
                  <Add />
                </IconButton>
              }
              title={parentNode}
              sx={{ textAlign: 'center', bgcolor: "#DEE1F9", color: 'gray', padding: 0.5 }}
              titleTypographyProps={{ variant: 'subheading' }}
            />
            <AutoFillGrid>
              <LeafNodes nodes={groupedByParentNode[parentNode]} />
            </AutoFillGrid>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
};
