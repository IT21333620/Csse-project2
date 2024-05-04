import React from "react";
import { Icon } from "@iconify/react";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import History from "../history";
import Home from "../home";
import MarsRover from "../marsRover/marsRover";

//Image imports 
import nasaLogo from "../public/images/logo.png";
import wallpaper from "../public/images/wallpaper.jpeg";
import { Grid } from "@mui/material";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNavbarButtonClick = (index) => {
    setSelectedIndex(index);
  };

  function Footer() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, background: `url(${wallpaper})`, backgroundSize: 'cover', color: 'white', width: '100%', position: 'fixed', bottom: 0, right:0 }}>
      <Typography variant="body2">© {new Date().getFullYear()} Razer. All rights reserved.</Typography>
    </Box>
    );
  }

  const drawer = (
    <div>
      <Toolbar sx={{ bgcolor: "black" }}>
        <img src={nasaLogo} alt="NASA Logo" style={{ width: "50px", height: "50px",marginRight:'10px' }} />
        <Typography sx={{ color: "white"}}>Menu</Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={(e) => handleNavbarButtonClick(0)}>
            <ListItemIcon>
              <Icon icon="solar:home-broken" style={{ fontSize: "20px" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={(e) => handleNavbarButtonClick(1)}>
            <ListItemIcon>
              <Icon icon="material-symbols:history" style={{ fontSize: "20px" }} />
            </ListItemIcon>
            <ListItemText primary="Hisory" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={(e) => handleNavbarButtonClick(2)}>
            <ListItemIcon>
              <Icon icon="token:space" style={{ fontSize: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Mars Rover" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar 
         //add a background image to the toolbar
          sx={{backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
         >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Nasa Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Grid container spacing={4}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        {selectedIndex === 0 && <Home />}
        {selectedIndex === 1 && <History />}
        {selectedIndex === 2 && <MarsRover />}
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Footer />
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
