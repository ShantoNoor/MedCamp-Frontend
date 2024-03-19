import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PeopleIcon from "@mui/icons-material/People";
import CampaignIcon from "@mui/icons-material/Campaign";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import CountUp from "react-countup";
import Stack from "@mui/material/Stack";

const FeatureStats = ({ data }) => {
  return (
    <Grid mt={1} container spacing={5} alignItems="stretch">
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title={"Total Registrations"}
            subheader={""}
            titleTypographyProps={{ align: "center" }}
            subheaderTypographyProps={{
              align: "center",
            }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                mb: 2,
              }}
            >
              <Typography component="h2" variant="h3" color="text.primary">
                <Stack
                  direction={"row"}
                  justifyContent="space-evenly"
                  alignItems="center"
                  spacing={4}
                >
                  <BookmarkIcon sx={{ fontSize: "56px" }} color="primary" />
                  <CountUp
                    start={0}
                    end={data.tr}
                    // enableScrollSpy={true}
                    scrollSpyOnce={true}
                    duration={2}
                  />
                </Stack>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title={"Total Camps"}
            subheader={""}
            titleTypographyProps={{ align: "center" }}
            subheaderTypographyProps={{
              align: "center",
            }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                mb: 2,
              }}
            >
              <Typography component="h2" variant="h3" color="text.primary">
                <Stack
                  direction={"row"}
                  justifyContent="space-evenly"
                  alignItems="center"
                  spacing={4}
                >
                  <CampaignIcon sx={{ fontSize: "56px" }} color="primary" />
                  <CountUp
                    start={0}
                    end={data.tc}
                    // enableScrollSpy={true}
                    scrollSpyOnce={true}
                    duration={2}
                  />
                </Stack>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title={"Total Registered Users"}
            subheader={""}
            titleTypographyProps={{ align: "center" }}
            subheaderTypographyProps={{
              align: "center",
            }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                mb: 2,
              }}
            >
              <Typography component="h2" variant="h3" color="text.primary">
                <Stack
                  direction={"row"}
                  justifyContent="space-evenly"
                  alignItems="center"
                  spacing={4}
                >
                  <PeopleIcon sx={{ fontSize: "56px" }} color="primary" />
                  <CountUp
                    start={0}
                    end={data.tr}
                    // enableScrollSpy={true}
                    scrollSpyOnce={true}
                    duration={2}
                  />
                </Stack>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FeatureStats;
