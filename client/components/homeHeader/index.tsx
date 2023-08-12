import { Box, Link, Typography } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const HomeHeader = () => {
  return (
    <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
      <Box sx={{ display: "flex", border: 1, justifyContent: "center", mt: 3 }}>
        <Typography variant="h2" component="div">
          <FastfoodIcon fontSize="large" />
          Verified Bite
        </Typography>
      </Box>
    </Link>
  );
};

export default HomeHeader;
