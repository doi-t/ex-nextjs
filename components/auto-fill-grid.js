import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const AutoFillGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  width: 'auto',
  gridAutoRows: 'auto',
  justifyContent: 'center',
}));

export default AutoFillGrid
