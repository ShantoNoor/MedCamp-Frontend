import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserAvater from "../components/UserAvater";
import Stack from "@mui/material/Stack";
import useAuth from "../hooks/useAuth";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Outlet } from "react-router-dom";

import DashboardMenu from "../components/DashboardMenu";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import HomeIcon from "@mui/icons-material/Home";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Copyright from "../components/Copyright";

const drawerWidth = 240;

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user } = useAuth();
  const [title, setTitle] = React.useState("Dashboard");

  const drawer = (
    <Box>
      <Stack justifyContent="center" alignItems="center" spacing={1} my={4}>
        <UserAvater size={75} />
        <Typography variant="h6" component="span">
          {user.name}
        </Typography>
      </Stack>
      <Divider />
      <List>
        {user.status === "organizer" && (
          <DashboardMenu
            menu={[
              [
                "Organizer Profile",
                "/dashboard/organizer-profile",
                <AccountCircleIcon key={15} />,
              ],
              [
                "Add Camp",
                "/dashboard/add-a-camp",
                <BookmarkAddIcon key={1} />,
              ],
              [
                "Manage Camps",
                "/dashboard/manage-camps",
                <BookmarksIcon key={2} />,
              ],
              [
                "Manage Registered Camps",
                "/dashboard/manage-registered-camps",
                <BookmarksIcon key={3} />,
              ],
            ]}
            setTitle={setTitle}
          />
        )}

        {user.status === "participant" && (
          <DashboardMenu
            menu={[
              [
                "Participant Profile",
                "/dashboard/participant-profile",
                <AccountCircleIcon key={1} />,
              ],
              [
                "Registered Camps",
                "/dashboard/registered-camps",
                <FormatListBulletedIcon key={1} />,
              ],
              [
                "Payment History",
                "/dashboard/payment-history",
                <FormatListBulletedIcon key={3} />,
              ],
              [
                "Feedback and Ratings",
                "/dashboard/feedback-and-ratings",
                <ReviewsIcon key={2} />,
              ],
            ]}
            setTitle={setTitle}
          />
        )}

        {user.status === "professional" && (
          <DashboardMenu
            menu={[
              [
                "Professional Profile",
                "/dashboard/professional-profile",
                <AccountCircleIcon key={13} />,
              ],
            ]}
            setTitle={setTitle}
          />
        )}
      </List>
      <Divider />
      <DashboardMenu
        menu={[
          ["Home", "/", <HomeIcon key={1} />],
          ["Log Out", "/sign-out", <ExitToAppIcon key={2} />],
        ]}
        setTitle={setTitle}
      />
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
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
              {title}
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
          <Box sx={{ mb: 4 }}>
            <Toolbar />
            <Outlet context={{ setTitle }} />
          </Box>
          <Copyright />
        </Box>
      </Box>
    </>
  );
}

export default DashboardLayout;
