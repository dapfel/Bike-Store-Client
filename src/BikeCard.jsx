import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import BikePage from './BikePage';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    height:300,
    marginBottom: '30px',
    textAlign: 'center'
  },
  price: {
    marginTop: '5px'
  },
  actionArea: {
    height: '-webkit-fill-available',
  }
});

export default function BikeCard(props) {
  const classes = useStyles();
  const bikeInfo = props.bikeInfo;

  const [open, setOpen] = React.useState(false);

  function handleCardClick(event) {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  };

  return (
    <Fragment>
    <Card className={classes.root} variant="outlined" elevation={0} onClick={handleCardClick}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          component="img"
          alt="bike-img"
          height="140"
          image= {`data:image/jpeg;base64,${bikeInfo.image}`}
          title={bikeInfo.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {bikeInfo.name}
          </Typography>
          <Typography className={classes.price}  variant="body1" color="textPrimary" component="p">
            {"$" + bikeInfo.price}
          </Typography>
        </CardContent>
      </CardActionArea>  
    </Card>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <BikePage bikeInfo={bikeInfo} onClose={handleClose} onAddToCart={props.onAddToCart} />
    </Dialog>
    </Fragment>
  );
}