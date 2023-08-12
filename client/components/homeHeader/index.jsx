import { Box, Link, Typography } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const HomeHeader = () => {
  return (
    <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
      <Box sx={{ border: 1, justifyContent: "center", mt: 5, borderRadius: 2, padding: 1}}>
      <Box sx={{ display: "flex", justifyContent: "center"}}>
        <Typography variant="h2" component="div" >
          <FastfoodIcon fontSize="large" />
          Verified Bite
          <FastfoodIcon fontSize="large" />
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center"}}>
        <Typography variant='h4'>Dont Trust Your Food. Verify It!</Typography>
      </Box>
      </Box>
    </Link>

  );
};

export default HomeHeader;
