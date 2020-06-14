import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import SignUpPage from "./SignUpPage";


const useStyles = makeStyles((theme) => ({
    button: {
      marginLeft: '6px',
      marginRight: '6px'
    }
  }));

export default function SignUpDialog() {
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
    <Fab color="primary" onClick={handleClickOpen} variant="extended"className={classes.button} >Sign Up</Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <SignUpPage />
      </Dialog>
    </div>
  );
}