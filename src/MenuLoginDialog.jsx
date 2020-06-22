import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import LoginPage from './LoginPage';

export default function MenuLoginDialog(props) {

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
      <MenuItem name="login" onClick={handleClickOpen}>Login</MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <LoginPage onLogin={props.onLogin} onClose={handleClose} />
      </Dialog>
    </div>
  );
}