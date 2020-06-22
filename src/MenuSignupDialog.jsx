import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import SignUpPage from "./SignUpPage";

export default function MenuSignupDialog(props) {

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
      <MenuItem name="signup" onClick={handleClickOpen}>Sign Up</MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <SignUpPage onClose={handleClose} />
      </Dialog>
    </div>
  );
}