import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const Banner = () => {
  const [st, sst] = useState('')

  return (
    <Box
      sx={{
        background:
          "url(https://1021sunrise.com/wp-content/uploads/2017/06/Courier-Service-1024x683.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <Typography variant="h1">Track Your Parcel</Typography>
        <TextField
          fullWidth
          label="Type Your Parcel ID ..."
          sx={{ display: "block", marginBottom: "10px" }}
          variant="filled"
          onChange={(e) => sst(e.target.value)}
        />
        <Box align="center">
          <Button size="large" variant="contained"
            onClick={() => {
              console.log(st) 
            }}
          >
            Track Parcel
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
