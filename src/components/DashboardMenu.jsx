import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardMenu = ({ menu, setTitle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    menu.forEach((item) => {
      if (item[1] === pathname) {
        setTitle(item[0]);
      }
    });
  }, [pathname, menu, setTitle]);

  return menu.map((item, index) => {
    return (
      <ListItem key={index} disablePadding onClick={() => navigate(item[1])}>
        <ListItemButton
          selected={item[1] === pathname}
          onClick={() => setTitle(item[0])}
        >
          <ListItemIcon>{item[2]}</ListItemIcon>
          <ListItemText primary={item[0]} />
        </ListItemButton>
      </ListItem>
    );
  });
};

export default DashboardMenu;
