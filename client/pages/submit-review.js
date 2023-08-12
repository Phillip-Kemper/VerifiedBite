import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
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
import { ethers } from "ethers";

import MediaCard from "../components/mediaCard";
import { Button, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import contractAddressInfo from "../web3/contractAddress.json";
import contractInfo from "../web3/VerifiedBite.json";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Blog = () => {
  const contractAddress = contractAddressInfo.address;
  const router = useRouter();
  const [orderCode, setOrderCode] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const handleOrderCodeChange = (event) => {
    const value = event.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOrderCode(value);
    }
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  React.useEffect(() => {
    if (router.query.code) {
      setOrderCode(router.query.code.toString());
    }
  }, [router.query.code]);

  const [provider, setProvider] = React.useState(null);
  React.useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      }
    };

    initializeProvider();
  }, []);

  const handleSubmit = async () => {
    if (!(orderCode.length === 6 && rating)) {
      alert("Please enter a valid order code and rating.");
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    let signer = provider.getSigner();
    let contract = new ethers.Contract(contractAddress, contractInfo.abi, signer);
    let receiptCode = `${orderCode}`;
    try {
      await contract.submitReview(receiptCode, rating);
    } catch (err) {
      alert("Invalid code: Code has been used before.");
      return;
    }
    router.push(`/`);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Typography variant="body1" component="div">
            Enter your order code:
          </Typography>
          <TextField
            id="order-code"
            label="Order Code"
            variant="outlined"
            value={orderCode}
            onChange={handleOrderCodeChange}
            sx={{ mt: 2 }}
            inputProps={{
              pattern: "[0-9]*",
              inputMode: "numeric",
              maxLength: 6,
            }}
          />
          <Typography variant="body1" component="div" sx={{ mt: 8 }}>
            Rate your experience (1-5 stars):
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={1}
            size="large"
            sx={{ mt: 2 }}
          />
          <Button variant="contained" sx={{ mt: 8 }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Blog;
