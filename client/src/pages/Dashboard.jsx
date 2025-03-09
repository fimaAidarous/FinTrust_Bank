import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu,
  Inventory,
  ShoppingCart,
  People,
  Category,
  Store,
} from "@mui/icons-material";
import { Link, Routes, Route } from "react-router-dom";

const drawerWidth = 150;

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f4f6f8",
      },
    },
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mx: "auto" }}>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: sidebarOpen
              ? { sm: `calc(100% - ${drawerWidth}px)` }
              : "100%",
            ml: sidebarOpen ? { sm: `${drawerWidth}px` } : "0",
            backgroundColor: darkMode ? "#333" : "#1976d2",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={handleSidebarToggle}
              sx={{ mr: 2, display: { sm: "block" } }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Bank Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { sm: sidebarOpen ? drawerWidth : 0 },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleSidebarToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant={sidebarOpen ? "permanent" : "temporary"}
            sx={{
              display: { xs: "none", sm: sidebarOpen ? "block" : "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: darkMode ? "#333" : "#f4f6f8",
              },
            }}
            open={sidebarOpen}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: darkMode ? "#181818" : "#f4f6f8",
          }}
        >
          <Toolbar />

        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
