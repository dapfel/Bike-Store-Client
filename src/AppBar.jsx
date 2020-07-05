import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AdaptiveMenu from './AdaptiveMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    height: 110,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    padding: 0,
    margin: '0 auto',
    width: '100%',
    maxWidth: '1300px',
    minHeight: 110,
    alignItems: 'center',
  }
}));

export default function MyAppBar(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <img src="images/logo.png" alt="logo" className={classes.logo} />
        <AdaptiveMenu
          onDisplayBikes={props.onDisplayBikes}
          isLoggedIn={props.isLoggedIn}
          onUpdateCart={props.onUpdateCart}
          cart={props.cart} 
          onCheckout={props.onCheckout} 
          onLogout={props.onLogout} 
          onLogin={props.onLogin} 
        />
      </Toolbar>
    </AppBar>
  </div>
  );
}