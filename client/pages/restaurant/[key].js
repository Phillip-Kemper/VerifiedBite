import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { getRestaurantById, restaurants } from "../../constants/restaurants";
import contractInfo from "../../web3/VerifiedBite.json";
import contractAddressInfo from "../../web3/contractAddress.json";

const Blog = () => {
  const router = useRouter();
  const { key } = router.query;

  const restaurant = getRestaurantById(Number(key));

  const [isLoading, setIsLoading] = useState(false);
  const [isPolygonZkEVM, setIsPolygonZkEVM] = React.useState(true);
  const rating = 4;

  const contractAddress = contractAddressInfo.address;
  const [provider, setProvider] = React.useState(null);
  const [reviews, setReviews] = React.useState([]);

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

  useEffect(() => {
    const getRestaurantData = async () => {
      if (provider) {
        const contract = new ethers.Contract(contractAddress, contractInfo.abi, provider);
        const restaurantReviews = await contract.getReviews(restaurant.id);
        setReviews(
          restaurantReviews.map((review) => ({ address: review[0], rating: parseInt(review[1]["_hex"], 16) }))
        );

        // restaurants.forEach(async (restaurant) => {
        //   const restaurantId = restaurant.id;
        //   console.log("restaurantReviews: " + JSON.stringify(restaurantReviews));
        //   const restaurantReviewsReformatted = restaurantReviews.map((review) => {
        //     return [review[0], parseInt(review[1]["_hex"], 16)];
        //   });
        //   reviews[restaurantId] = restaurantReviewsReformatted;
        //   setReviews(Object.assign({}, reviews, { restaurantId: restaurantReviewsReformatted }));
        //   console.log("restaurantReviews " + restaurantId + ": " + JSON.stringify(restaurantReviewsReformatted));
        // });
      }
    };
    getRestaurantData();
  }, [provider]);

  const averageRating =
    reviews.length > 0 ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0;

  return (
    <>
      {!isPolygonZkEVM && <Typography variant="h5">For more than just read access and submitting your own review, pls connect wallet to Polygon zkEVM Testnet</Typography>}      
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        {restaurant ? (
          <Grid container direction={"column"} spacing={2} alignContent={"center"} justifyContent={"center"}>
            <Grid item>
              <Typography variant="h2">{restaurant.name}</Typography>
            </Grid>
            <Grid item>
              <Grid container item alignItems={"center"} spacing={2}>
                <Grid item>
                  <Rating
                    value={averageRating}
                    disabled
                    precision={0.5}
                    size="large"
                    sx={{ opacity: "1.0 !important" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1">({reviews.length} reviews)</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Box
                component="img"
                sx={{
                  height: 466,
                  width: 700,
                  maxHeight: { xs: 466, md: 233 },
                  maxWidth: { xs: 700, md: 350 },
                  objectFit: "cover",
                }}
                src={restaurant.imageURL}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">All Reviews:</Typography>
            </Grid>
            {reviews.map((review) => (
              <Grid container item key={review.address} alignItems={"center"} spacing={4}>
                <Grid item>
                  <Typography variant="body1" style={{ fontFamily: "'Roboto Mono', monospace" }}>
                    {review.address}
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    value={review.rating}
                    disabled
                    precision={1}
                    size="large"
                    sx={{ opacity: "1.0 !important" }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h4" component="div">
            Restaurant does not exist.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Blog;
