import { Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import MapContainer from "../components/MapContainer";
import useTitle from "../hooks/useTitle";

const MapWrapper = styled("div")({
  height: "400px",
  width: "100%",
});

const ContactUs = () => {
  useTitle("Contact Us");
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Our Location
          </Typography>
          <MapWrapper>
            <MapContainer />
          </MapWrapper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1">123 Main Street, Cityville</Typography>
          <Typography variant="body1">Email: example@example.com</Typography>
          <Typography variant="body1">Phone: 123-456-7890</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
