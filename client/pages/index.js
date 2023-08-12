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
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contractInfo from "../web3/VerifiedBite.json";

import MediaCard from "../components/mediaCard";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Blog = () => {
  const contractAddress = "0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5";
  const [provider, setProvider] = React.useState(null);
  // const [network, setNetwork] = React.useState("");
  // const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

  React.useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("output: " + JSON.stringify(ethers.providers));
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("provider: " + provider);
        setProvider(provider);
      }
    };

    initializeProvider();
  }, []);

  // React.useEffect(() => {
  //   const getNetwork = async () => {
  //     if (provider) {
  //       const network = await provider.getNetwork();
  //       console.log("output: " + JSON.stringify(network.name));
  //       setNetwork(network.name);
  //     }
  //   };

  //   getNetwork();
  // }, [provider]);

  let restaurantId = 123; // your restaurantId

  const interactWithContract = async () => {
    const contract = new ethers.Contract(contractAddress, contractInfo.abi, provider);
    console.log(await contract.admin());
    console.log(await contract.submittedReviews(restaurantId, 0));
  };

  const interactWithContract2 = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    let signer = provider.getSigner();
    let contract = new ethers.Contract(contractAddress, contractInfo.abi, signer);
    console.log("admin" + (await contract.admin()));
    let receiptCode = ethers.utils.formatBytes32String("123123");
    await contract.addReceiptCode(receiptCode, restaurantId);
    console.log("success addReceiptCode");
    let rating = 4;
    await contract.submitReview(receiptCode, rating);
    console.log("success submitReview: " + receiptCode + " " + rating);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 2 }}>
          {/* Connected to network: {network} */}
          <button onClick={interactWithContract}>Interact with Contract</button>
          <button onClick={interactWithContract2}>Interact with Contract 2</button>
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
