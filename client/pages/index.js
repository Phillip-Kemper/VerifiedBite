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
import { getRestaurantById, restaurants } from "../constants/restaurants";
import { useEffect, useState } from "react";
import contractInfo from "../web3/VerifiedBite.json";
import contractAddressInfo from "../web3/contractAddress.json";
import keccak256 from "keccak256";
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
  const contractAddress = contractAddressInfo.address;
  const [provider, setProvider] = React.useState(null);
  const [reviews, setReviews] = React.useState(new Map());
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
    let restaurantId = 2;
    let receiptCode = "123123";
    var receiptCodeHash = ethers.utils.solidityKeccak256(["string"], [`${receiptCode}`]);
    receiptCodeHash = ethers.utils.arrayify(receiptCodeHash);
    await contract.addReceiptCode(receiptCodeHash, restaurantId);
    // const result = await contract.unusedReceiptCodes(receiptCodeHash);
  };

  // useEffect that fetches the restaurant data from the blockchain
  useEffect(() => {
    const getRestaurantData = async () => {
      if (provider) {
        const contract = new ethers.Contract(contractAddress, contractInfo.abi, provider);
        restaurants.forEach(async (restaurant) => {
          const restaurantId = restaurant.id;
          const restaurantReviews = await contract.getReviews(restaurantId);
          const restaurantReviewsReformatted = restaurantReviews.map((review) => [review[0], parseInt(review[1]["hex"], 16)])
          reviews[restaurantId] = restaurantReviewsReformatted;
          setReviews(Object.assign({}, reviews, {restaurantId: restaurantReviewsReformatted}));
          console.log("restaurantReviews " + restaurantId + ": " + JSON.stringify(restaurantReviewsReformatted));
        });
      }
    };

    getRestaurantData();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 2 }}>
          {/* Connected to network: {network} */}
          <button onClick={interactWithContract}>Interact with Contract</button>
          <button onClick={interactWithContract2}>Interact with Contract 2</button>
          {restaurants.map((restaurant) => 
            (reviews[restaurant.id] != undefined && reviews[restaurant.id]).length > 0 ? 
            <MediaCard
              key={restaurant.id}
              title={restaurant.name}
              rating={reviews[restaurant.id].reduce((acc, cur) => acc + cur[1]) / reviews[restaurant.id].length}
              numberOfReviews={reviews[restaurant.id].length}
              imageUrl={restaurant.imageURL}
              restaurantId={restaurant.id}
            /> :
            <MediaCard
            key={restaurant.id}
            title={restaurant.name}
            rating={0}
            numberOfReviews={0}
            imageUrl={restaurant.imageURL}
            restaurantId={restaurant.id}
          />
          )}
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
