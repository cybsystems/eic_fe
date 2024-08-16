import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled, Theme } from '@mui/material/styles';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerHeaderComponent = ({
  handleDrawerClose,
  theme,
}: {
  handleDrawerClose: () => void;
  theme: Theme;
}) => (
  <DrawerHeader>
    <Stack direction={"row"} flex={1} justifyContent={'space-evenly'}>
      <img src={"/vite.svg"} />
      <Typography variant="h4">WHMS</Typography>
    </Stack>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  </DrawerHeader>
);

export default DrawerHeaderComponent;
