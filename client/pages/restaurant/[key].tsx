import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

import { useState } from "react";
import { Rating } from "@mui/material";
import { getRestaurantById, restaurants } from "../../constants/restaurants";

const Blog: NextPage = () => {
  const router = useRouter();
  const { key } = router.query;
  
  const restaurant = getRestaurantById(Number(key));

  const reviews = [{address: "0x44895A5c92A98dB050D6327cD4b1F2f82D558E6F", rating: 3}, {address: "0x4Bb355DD5Aff93747950D1c623516234697c5b4c", rating: 3}, {address: "0x340CBA3bC8fF77084EcA68Aac14eCE214af39559", rating: 5}, {address: "0x7A7a9D8A6F89136Ace4BC7A8b17C331cac512786", rating: 1}]

  const [isLoading, setIsLoading] = useState(false);
  const rating = 4;
  const numberOfReviews = 15;


  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
          
          {restaurant ? 
        <Grid container direction={"column"} spacing={2} alignContent={"center"} justifyContent={"center"}>
          <Grid item>
            <Typography variant="h2">{restaurant.name}</Typography>
          </Grid>
          <Grid item>
          <Grid container item alignItems={"center"} spacing={2}> 
            <Grid item> 
          <Rating value={rating} disabled precision={0.5} size="large" sx={{ opacity: "1.0 !important" }} />
             </Grid>
          <Grid item> 
            <Typography variant="body1">({numberOfReviews} reviews)</Typography>
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
                objectFit: "cover"
              }}
              src={restaurant.imageURL}
          />
          </Grid>
          <Grid item>
            <Typography variant="h5">All Reviews:</Typography>
          </Grid>
          {reviews.map(review => <Grid container item key={review.address} alignItems={"center"} spacing={4}> 
            <Grid item> 
            <Typography variant="body1" style={{fontFamily: "'Roboto Mono', monospace"}}>{review.address}</Typography>
             </Grid><Grid item> 
             <Rating value={review.rating} disabled precision={1} size="large" sx={{ opacity: "1.0 !important" }} />
             </Grid>
          
           </Grid>)}
          
          </Grid> : <Typography variant="h4" component="div">
          Restaurant does not exist.
        </Typography>}
        
      </Box>
    </>
  );
};

export default Blog;
