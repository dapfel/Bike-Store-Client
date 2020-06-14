import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import LoginPage from './LoginPage';

const useStyles = makeStyles((theme) => ({
    button: {
      marginLeft: '6px',
      marginRight: '6px'
    }
  }));

export default function LoginDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen} className={classes.button}>Login</Button> 
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <LoginPage />
      </Dialog>
    </div>
  );
}