import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function NotificationList() {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        maxHeight: 300,
        bgcolor: "background.paper",
      }}
    >
      {[1, 2, 3].map((el, idx, arr) => {
        return (
          <Box key={idx}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            {(idx != arr.length-1) && <Divider />}
          </Box>
        );
      })}
    </List>
  );
}
