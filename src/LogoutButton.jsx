import React from 'react';
import Button from '@material-ui/core/Button';

export default function LogoutButton(props) {
  
    function handleLogout() {
      fetch ("/logout")
      .then(res => {
      if (res.status === 200) {
        props.onLogout();
      }});
    }
   
    return (
     <Button color="inherit" onClick={handleLogout} >Log Out</Button> 
    );
  }