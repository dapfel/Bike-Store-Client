import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CartPage from './CartPage';
import MyShoppingCartIcon from './MyShoppingCartIcon';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: '3px 8px',
    marginLeft: '6px',
    marginRight: '6px'
  }
}));

export default function CartDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} color="secondary" className={classes.button}>
        <MyShoppingCartIcon cart={props.cart}/> 
        CART
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <CartPage cart={props.cart} onUpdateCart={props.onUpdateCart} onCheckout={props.onCheckout} onClose={handleClose} />
      </Dialog>
    </div>
  );
}