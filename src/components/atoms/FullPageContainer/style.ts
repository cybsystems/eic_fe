import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const FullPageContainerWrapper = styled(Box)({
  height: '100%',  // Match parent's height
  width: '100%',   // Match parent's width
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
