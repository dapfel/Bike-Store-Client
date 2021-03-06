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

export default function SignUpDialog(props) {
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
    <Fab color="primary" onClick={handleClickOpen} variant="extended"className={classes.button} >SIGN UP</Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <SignUpPage onClose={handleClose} />
      </Dialog>
    </div>
  );
}