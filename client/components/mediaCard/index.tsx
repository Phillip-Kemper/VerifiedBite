import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';

type MediaCardPropsType = {
  title: string,
  rating: number,
  imageUrl: string
}

export default function MediaCard({title, rating, imageUrl}: MediaCardPropsType) {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Rating
            value={rating}
            disabled
            precision={0.5}
            size="large"
            sx={{ mt: 2 }}
          />
          <Typography>(10 reviews)</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
