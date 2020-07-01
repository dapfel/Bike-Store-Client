import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

export default function Review(props) {
  const classes = useStyles();

  const addresses = [props.shippingAddress.address1 + " " + props.shippingAddress.address2,
                   props.shippingAddress.city,
                   props.shippingAddress.state,
                   props.shippingAddress.zip,
                   props.shippingAddress.country];
const payments = [
  { name: 'Card holder', detail: props.creditCard.name },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-' + props.creditCard.num.substring(12,16) },
  { name: 'Expiry date', detail: props.creditCard.exp },
];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.cart.map((product, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">{"$" + product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {"$" + totalPrice(props.cart)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {props.shippingAddress.firstName + " " +props.shippingAddress.lastName }
          </Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        {props.activeStep !== 0 && (
          <Button onClick={props.handleBack} className={classes.button}>
            Back
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={props.handleNext}
          className={classes.button}
        >
          Place Order
        </Button>
      </div>
    </React.Fragment>
  );
}

function totalPrice(cart) {
  let total = 0;
  cart.forEach((product) => {total += product.price});
  return total;
}