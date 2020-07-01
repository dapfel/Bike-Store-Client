import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SignUpCompleteDialog(props) {

  return (
      <Dialog
        open={true}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.success ? "Registration Successful!" : "Registration Failed"}
        </DialogTitle>
        <DialogContent>
          {props.success ? 
          <DialogContentText id="alert-dialog-description">
            You may now log-in to your account.
          </DialogContentText>
          :
          <DialogContentText id="alert-dialog-description">
            Failed to complete Sign Up.
          </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
  );
}