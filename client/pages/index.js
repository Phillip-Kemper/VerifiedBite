import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Link from "next/link";
import { ethers } from "ethers";
import { getRestaurantById, restaurants } from "../constants/restaurants";
import { useEffect, useState } from "react";
import contractInfo from "../web3/VerifiedBite.json";
import contractAddressInfo from "../web3/contractAddress.json";
import MediaCard from "../components/mediaCard";
import { Button, Typography } from "@mui/material";

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
  const [isPolygonZkEVM, setIsPolygonZkEVM] = React.useState(true);
  const [reviews, setReviews] = React.useState(new Map());

  React.useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("output: " + JSON.stringify(ethers.providers));
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("provider: " + provider);
        setProvider(provider);
        const network = await provider.getNetwork();
        if(network.chainId != 1442) {
          setIsPolygonZkEVM(false);
          setProvider(new ethers.providers.JsonRpcProvider("https://rpc.public.zkevm-test.net/"));
        }
      }
    };

    initializeProvider();
  }, []);

  // useEffect that fetches the restaurant data from the blockchain
  useEffect(() => {
    const getRestaurantData = async () => {
      if (provider) {
        const contract = new ethers.Contract(contractAddress, contractInfo.abi, provider);
        restaurants.forEach(async (restaurant) => {
          const restaurantId = restaurant.id;
          const restaurantReviews = await contract.getReviews(restaurantId);
          
          const restaurantReviewsReformatted = restaurantReviews.map((review) => {
            return [review[0], parseInt(review[1]["_hex"], 16)];
          });
          reviews[restaurantId] = restaurantReviewsReformatted;
          setReviews(Object.assign({}, reviews, { restaurantId: restaurantReviewsReformatted }));
        });
      }
    };

    getRestaurantData();
  }, [provider]);

  return (
    <>
      {!isPolygonZkEVM && <Typography variant="h5">For more than just read access and submitting your own review, pls connect wallet to Polygon zkEVM Testnet</Typography>}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 2 }}>
          {/* Connected to network: {network} */}
          {restaurants.map((restaurant) =>
            (reviews[restaurant.id] != undefined && reviews[restaurant.id]).length > 0 ? (
              <MediaCard
                key={restaurant.id}
                title={restaurant.name}
                rating={reviews[restaurant.id].reduce((acc, cur) => acc + cur[1], 0) / reviews[restaurant.id].length}
                numberOfReviews={reviews[restaurant.id].length}
                imageUrl={restaurant.imageURL}
                restaurantId={restaurant.id}
              />
            ) : (
              <MediaCard
                key={restaurant.id + "empty"}
                title={restaurant.name}
                rating={0}
                numberOfReviews={0}
                imageUrl={restaurant.imageURL}
                restaurantId={restaurant.id}
              />
            )
          )}
        </Box>
      </Box>
      <Box sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}>
        <Link href="/submit-review" passHref>
          <Button disabled={!isPolygonZkEVM} variant="contained" color="primary" size="large">
            <AddIcon/> Submit a Review
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Blog;
