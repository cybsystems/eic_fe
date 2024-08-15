import ModuleContainer from "@components/atoms/ModuleContainer";
import AppBar from "@components/molecules/AppBar";
import DrawerComponent from "@components/molecules/AppDrawer";
import { useAuth } from "@contexts/authContext";
import useDeviceType from "@hooks/useMediaDevice";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isMobile } = useDeviceType();

  const [open, setOpen] = React.useState(!isMobile); // Drawer open state

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    if (!isMobile) setOpen(true);
  };

  const handleDrawerClose = () => {
    if (!isMobile) setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleLogout={handleLogout}
      />
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
      <ModuleContainer>
        <Outlet />
      </ModuleContainer>
    </Box>
  );
};

export default HomePage;
