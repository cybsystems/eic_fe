/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { Domain } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import WorkIcon from '@mui/icons-material/Work';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import BusinessIcon from '@mui/icons-material/Business';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Send';

import { useLocation, useNavigate } from 'react-router-dom';

const DrawerContent = ({ open }: { open: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMasters, setOpenMasters] = useState(false);

  const handleToggleMasters = () => {
    setOpenMasters(!openMasters);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Work Orders', icon: <WorkIcon />, path: '/work-orders' },
    { text: 'Items', icon: <StoreIcon />, path: '/stocks' },
    { text: 'CRM', icon: <ContactMailIcon />, path: '/crm' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Vendors', icon: <PeopleIcon />, path: '/vendors' },
    { text: 'Inwards', icon: <InputIcon />, path: '/inwards' },
    { text: 'Dispatch', icon: <OutputIcon />, path: '/dispatch' },
    { text: 'Material Issue', icon: <OutputIcon />, path: '/material-issue' },

    { text: 'Projects', icon: <Domain />, path: '/projects' },
    // {
    //   text: 'Masters',
    //   icon: <BusinessIcon />,
    //   subItems: [
    //     { text: 'Projects', icon: <Domain />, path: '/projects' },
    //     { text: 'Firms', icon: <Domain />, path: '/firms' },
    //   ],
    // },
    { text: 'Reports', icon: <AssignmentIcon />, path: '/reports' },
  ];

  return (
    <>
      <Divider />
      <List>
        {menuItems.map((item) => {
          //@ts-ignore
          if (item.subItems) {
            // Handle menu item with sub-items (e.g., "Masters")
            return (
              <div key={item.text}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    onClick={handleToggleMasters}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    {open && (openMasters ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openMasters} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    
                    {
                    //@ts-ignore
                    item.subItems.map((subItem) => {
                      const isActiveSub = location.pathname.startsWith(subItem.path);

                      return (
                        <ListItem
                          key={subItem.text}
                          disablePadding
                          sx={{ display: 'block', pl: 4 }}
                        >
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                              backgroundColor: isActiveSub ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                              },
                            }}
                            onClick={() => navigate(subItem.path)}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: isActiveSub ? 'primary.main' : 'inherit',
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={subItem.text} 
                              sx={{ 
                                opacity: open ? 1 : 0, 
                                color: isActiveSub ? 'primary.main' : 'inherit',
                              }} 
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          } else {
            // Handle normal menu items
            const isActive = item.path === '/' 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path) && location.pathname !== '/';

            return (
              <ListItem 
                key={item.text} 
                disablePadding 
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? 'primary.main' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      opacity: open ? 1 : 0, 
                      color: isActive ? 'primary.main' : 'inherit',
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
      <Divider />
    </>
  );
};

export default DrawerContent;
