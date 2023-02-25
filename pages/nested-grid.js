import Item from '../components/item';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Parent Gird can not know how many grids child grid has.
// From the parent Grid point of view, all elements that 
// has nested Grids is a single grid. So, it secures only 1 column 
// with 'repeat(auto-fill)' regardless of the number of nested Grid.
// This behavior causes to have single column for all nested Grids.
const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 100px)',
  width: 'auto',
  gridAutoRows: 'auto',
  justifyContent: 'center',
  gap: 1,
  gridGap: 10,
  padding: theme.spacing(2),
}));

const NestedGridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 100px)',
  width: 'auto',
  gridAutoRows: 'auto',
  justifyContent: 'center',
  gap: 1,
  gridGap: 10,
  padding: theme.spacing(2),
}));

export default function NestedGrid({ }) {
  return (
    <GridContainer>
      <Item> node
        <NestedGridContainer>
          <Item> nested node </Item>
        </NestedGridContainer>
      </Item>
      <Item> node
        <NestedGridContainer>
          <Item> nested node </Item>
          <Item> nested node </Item>
          <Item> nested node </Item>
        </NestedGridContainer>
      </Item>
      <Item> node
        <NestedGridContainer>
          <Item> nested node </Item>
          <Item> nested node </Item>
        </NestedGridContainer>
      </Item>
    </GridContainer>
  )
};
