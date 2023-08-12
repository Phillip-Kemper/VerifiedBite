import { Box, Typography } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const HomeHeader = () => {
  return (
    <Box sx={{ display: "flex", border: 1, justifyContent: "center", mt: 3 }}>
      <Typography variant="h2" component="div">
        <FastfoodIcon fontSize="large" />
        Verified Bite
      </Typography>
    </Box>
  );
};

export default HomeHeader;
