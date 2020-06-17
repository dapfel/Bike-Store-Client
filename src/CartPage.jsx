import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function CartPage(props) {
  const classes = useStyles();

  function handleCheckoutClick() {
    props.onClose();
    props.onCheckout();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Shopping Cart
        </Typography>
        {(props.cart.length !== 0) ?
        <React.Fragment>
          <List disablePadding>
            {props.cart.map((product) => 
              <ListItem className={classes.listItem} key={product.name}>
                <ListItemText primary={product.name} secondary={product.desc} />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            )}
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                $34.06
              </Typography>
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckoutClick}
            className={classes.button}
          >
            Checkout
          </Button> 
        </React.Fragment>
        :
        <Typography variant="subtitle1">
        Your cart is empty.
        </Typography>
        }
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}