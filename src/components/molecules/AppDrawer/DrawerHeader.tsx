import { styled, Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerHeaderComponent = ({ handleDrawerClose, theme }: { handleDrawerClose: () => void, theme: Theme }) => (
  <DrawerHeader>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  </DrawerHeader>
);

export default DrawerHeaderComponent;
