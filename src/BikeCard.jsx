import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginBottom: '30px',
    textAlign: 'center'
  },
  price: {
    marginTop: '5px'
  }
});

export default function BikeCard() {
  const classes = useStyles();

  function handleCardClick(event) {

  }

  return (
    <Card className={classes.root} onClick={handleCardClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Awsome Bike"
          height="140"
          image="/images/0030362_6ku-fixie-single-speed-bike-detroit.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Awesome Bike
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This is a a great bike. You should really buy it and have a lot of good times riding around on it.
          </Typography>
          <Typography className={classes.price}  variant="body1" color="textPrimary" component="p">
            $450.00
          </Typography>
        </CardContent>
      </CardActionArea>  
    </Card>
  );
}