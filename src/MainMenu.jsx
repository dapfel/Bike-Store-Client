import React, {Fragment, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuCartDialog from  './MenuCartDialog';
import MenuLoginDialog from  './MenuLoginDialog';
import MenuSignupDialog from  './MenuSignupDialog';

export default function MainMenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (event) => {
      setAnchorEl(null);

      if (event.target.name === 'logout') {
          props.onLogout();
      }
    };

  return (
    <Fragment>
      <IconButton color="inherit" aria-label="menu"onClick={handleClick} >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuCartDialog onCheckout={props.onCheckout} cart={props.cart} onCloseMenu={handleClose} />
        {props.isLoggedIn ?
          <MenuItem name='logout' onClick={handleClose}>Logout</MenuItem>
        :
          <Fragment>
            <MenuLoginDialog onLogin={props.onLogin} onCloseMenu={handleClose} />
            <MenuSignupDialog onCloseMenu={handleClose} />
          </Fragment>
        }
      </Menu>
    </Fragment>
  )
}