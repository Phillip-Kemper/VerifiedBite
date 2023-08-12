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

  // compute restaurant id from key
  // future: API request to get restaurant based on key + web2 auth
  // for now, use part of key as restaurant id -> 2uf8h9238rf_3 will be restaurantId 3
  const restaurantId = key?.toString().split("_")[1];

  const [isLoading, setIsLoading] = useState(false);
  const rating = 4;


  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 20 }}>
          
          {restaurant ? 
        <Grid container direction={"column"} spacing={2} alignContent={"center"} justifyContent={"center"}>
          <Grid item>
            <Typography variant="h2">{restaurant.name}</Typography>
          </Grid>
          <Grid item>
          <Rating value={rating} disabled precision={0.5} size="large" sx={{ mt: 2, opacity: "1.0 !important" }} />
          </Grid>
          <Grid item>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                objectFit: "cover"
              }}
              style={{
                objectFit: "cover",}}
              src={restaurant.imageURL}
          />
          </Grid>
          <Grid item>
            <Typography variant="h5">All Reviews:</Typography>
          </Grid>
          
          </Grid> : <Typography variant="h4" component="div">
          Restaurant does not exist.
        </Typography>}
        
      </Box>
    </>
  );
};

export default Blog;
