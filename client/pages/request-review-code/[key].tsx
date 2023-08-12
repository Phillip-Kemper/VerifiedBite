import * as React from "react";
import { NextPage } from "next";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import QRCode from "qrcode.react";

import MediaCard from "../../components/mediaCard";

import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const Blog: NextPage = () => {
  const router = useRouter();
  const { key } = router.query;

  // compute restaurant id from key
  // future: API request to get restaurant based on key + web2 auth
  // for now, use part of key as restaurant id -> 2uf8h9238rf_3 will be restaurantId 3
  const restaurantId = key?.toString().split("_")[1];

  const [isLoading, setIsLoading] = useState(false);
  const [reviewCode, setReviewCode] = useState("");

  const qrCodeUrl = `http://localhost:3001/submit-review?code=${reviewCode}`;

  const handleRequestReviewCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/review-code`, {
        restaurantId,
      });
      setReviewCode(response.data.reviewCode);
    } catch (error) {
      // console.error(error);
      setReviewCode("123456");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 20 }}>
        <Grid container spacing={2}>
          {!reviewCode ? (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" onClick={handleRequestReviewCode} disabled={isLoading}>
                  {isLoading ? "Loading..." : "Request Review Code"}
                </Button>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                  <Typography variant="h4" component="div">
                    New Review Code:
                  </Typography>
                  <Box sx={{ mt: 3, display: "flex", justifyContent: "center", textAlign: "center" }}>
                    <Typography variant="h4" component="div">
                      {reviewCode}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                    <QRCode value={qrCodeUrl} size={256} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Blog;
