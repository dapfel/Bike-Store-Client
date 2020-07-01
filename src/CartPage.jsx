import React, {Fragment} from 'react';
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
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
    minHeight: '300px',
    minWidth: '350px',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cartIcon: {
    padding: theme.spacing(2, 2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
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

  function handleRemoveItemClick(index) {
    props.onUpdateCart(index);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.cartIcon}>
          <ShoppingCartOutlinedIcon fontSize='large' color='primary'/>
        </div>
        <Typography variant="h6" gutterBottom>
          Shopping Cart
        </Typography>
        {(props.cart.length !== 0) ?
        <Fragment>
          <div className={classes.list}>
            <List>
            {props.cart.map((product, index) => 
              <ListItem className={classes.listItem} key={index}>
                <ListItemAvatar>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItemClick(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText primary={product.name} secondary={"$" + product.price} />
              </ListItem>
            )}
            </List>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckoutClick}
            className={classes.button}
          >
            Checkout
          </Button> 
        </Fragment>
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