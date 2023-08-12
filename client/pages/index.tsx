import * as React from "react";
import { NextPage } from "next";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Link from "next/link";

import MediaCard from "../components/mediaCard";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Blog: NextPage = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 2 }}>
          <MediaCard
            title={"Lizard"}
            rating={4}
            numberOfReviews={15}
            imageUrl={"https://mui.com/static/images/cards/contemplative-reptile.jpg"}
          />
          <MediaCard
            title={"Lizard"}
            rating={3.6}
            numberOfReviews={10}
            imageUrl={"https://mui.com/static/images/cards/contemplative-reptile.jpg"}
          />
          <MediaCard
            title={"Lizard"}
            rating={1.7}
            numberOfReviews={13}
            imageUrl={"https://mui.com/static/images/cards/contemplative-reptile.jpg"}
          />
          <MediaCard
            title={"Lizard"}
            rating={2.3}
            numberOfReviews={10}
            imageUrl={"https://mui.com/static/images/cards/contemplative-reptile.jpg"}
          />
        </Box>
      </Box>
      <Box sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}>
        <Link href="/submit-review" passHref>
          <Button variant="contained" color="primary" size="large">
            <AddIcon /> Submit a Review
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Blog;
