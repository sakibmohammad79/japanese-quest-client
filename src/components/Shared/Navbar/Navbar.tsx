"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Link from "next/link";

import dynamic from "next/dynamic";

const drawerWidth = 240;
// const navItems = ["Home", "About", "Contact"];

export default function Navbar() {
  const AuthButtonLg = dynamic(
    () => import("@/components/UI/AuthButton/AuthButtonLg"),
    { ssr: false }
  );
  const AuthButtonSm = dynamic(
    () => import("@/components/UI/AuthButton/AuthButtonSm"),
    { ssr: false }
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        JAPANSE QUEST
      </Typography>
      <Divider />
      <List>
        <Link href="/">
          <Typography>HOME</Typography>
        </Link>
        <Link href="/lesson">
          <Typography py={2}>LESSON</Typography>
        </Link>
        <Link href="/tutorial">
          <Typography>TUTORIAL</Typography>
        </Link>
      </List>
    </Box>
  );

  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#F4F1EA", py: 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%", gap: 5 }}
          >
            <Link href="/">
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                JAPANSE QUEST
              </Typography>
            </Link>
            <Box sx={{ display: { xs: "none", sm: "flex", gap: 32 } }}>
              <Link href="/">
                <Typography>HOME</Typography>
              </Link>
              <Link href="/lesson">
                <Typography>LESSON</Typography>
              </Link>
              <Link href="/tutorial">
                <Typography>TUTORIAL</Typography>
              </Link>
            </Box>
            <AuthButtonLg></AuthButtonLg>
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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

          <AuthButtonSm></AuthButtonSm>
        </Drawer>
      </nav>
    </Box>
  );
}
