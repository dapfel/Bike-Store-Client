import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import CartPage from './CartPage';

export default function MenuCartDialog(props) {

  const [open, setOpen] = React.useState(false);

  function handleClickOpen(event) {
    props.onCloseMenu(event);
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem name="cart" onClick={handleClickOpen}>Cart</MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <CartPage cart={props.cart} onCheckout={props.onCheckout} onClose={handleClose} />
      </Dialog>
    </div>
  );
}