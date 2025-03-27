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
  AccountCircle,
  AccountBalance,
  CreditCardOff,
  AttachMoney,
  ReceiptLong,
  Notifications,
  TransferWithinAStation,
} from "@mui/icons-material";
import { Link, Routes, Route } from "react-router-dom";
import CreateAccount from "../components/Accounts/CreateAccount";
import CreateTransaction from "../components/Transactions/CreateTransaction";
import CreateTransfer from "../components/Transfer/CreateTransfer";

const drawerWidth = 240; 

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
        default: darkMode ? "#121212" : "#ffffff", 
      },
      success: {
        main: "#4caf50", 
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
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
      <List>
        <ListItem button component={Link} to="/create-account">
          <ListItemIcon sx={{ minWidth: "40px", color: theme.palette.success.main }}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Accounts" sx={{ color: theme.palette.success.main }} />
        </ListItem>
        <ListItem button component={Link} to="/create-transaction">
          <ListItemIcon sx={{ minWidth: "40px", color: theme.palette.success.main }}>
            <AccountBalance />
          </ListItemIcon>
          <ListItemText primary="Transaction" sx={{ color: theme.palette.success.main }} />
        </ListItem>
        <ListItem button component={Link} to="/create-transfer">
          <ListItemIcon sx={{ minWidth: "40px", color: theme.palette.success.main }}>
            <TransferWithinAStation />
          </ListItemIcon>
          <ListItemText primary="Transfer" sx={{ color: theme.palette.success.main }} />
        </ListItem>
        <ListItem button component={Link} to="/loan">
          <ListItemIcon sx={{ minWidth: "40px", color: theme.palette.success.main }}>
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary="Loan" sx={{ color: theme.palette.success.main }} />
        </ListItem>
        <ListItem button component={Link} to="/card">
          <ListItemIcon sx={{ minWidth: "40px", color: theme.palette.success.main }}>
            <CreditCardOff />
          </ListItemIcon>
          <ListItemText primary="Card" sx={{ color: theme.palette.success.main }} />
        </ListItem>
        <ListItem button component={Link} to="/bill-payment">
          <ListItemIcon sx={{ minWidth: "40px", color: theme.palette.success.main }}>
            <ReceiptLong />
          </ListItemIcon>
          <ListItemText primary="Bill Payment" sx={{ color: theme.palette.success.main }} />
        </ListItem>
        <ListItem button component={Link} to="/notifications">
          <ListItemIcon sx={{ minWidth: "40px", color: theme.palette.success.main }}>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Notification" sx={{ color: theme.palette.success.main }} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: sidebarOpen ? { sm: `calc(100% - ${drawerWidth}px)` } : "100%",
            ml: sidebarOpen ? { sm: `${drawerWidth}px` } : "0",
            backgroundColor: theme.palette.success.main,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
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
                backgroundColor: darkMode ? "#333" : "#ffffff", 
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
                backgroundColor: darkMode ? "#333" : "#ffffff", 
                borderRight: darkMode ? "1px solid #444" : "1px solid #ddd",
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
            backgroundColor: darkMode ? "#181818" : "#ffffff",
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/create-transaction" element={<CreateTransaction />} />
            <Route path="/create-transfer" element={<CreateTransfer />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
