import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";

type MediaCardPropsType = {
  title: string;
  restaurantId: number;
  rating: number;
  numberOfReviews: number;
  imageUrl: string;
};

export default function MediaCard({ title, rating, restaurantId, numberOfReviews, imageUrl }: MediaCardPropsType) {
  const router = useRouter();

  return (
    <Card sx={{ width: 350 }}>
      <CardMedia component="img" height="140" image={imageUrl} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Rating value={rating} disabled precision={0.5} size="medium" sx={{ mt: 2, opacity: "1.0 !important" }} />
        <Typography>({numberOfReviews} reviews)</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push("/restaurant/" + restaurantId)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
