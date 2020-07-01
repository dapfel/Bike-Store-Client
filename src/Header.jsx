import React from "react";
import MyAppBar from "./AppBar";

function Header(props) {
  return (
    <MyAppBar 
      onDisplayBikes={props.onDisplayBikes} 
      isLoggedIn={props.isLoggedIn} 
      onLogin={props.onLogin} 
      onLogout={props.onLogout}
      onCheckout={props.onCheckout}
      onUpdateCart={props.onUpdateCart}
      cart={props.cart}
    />
  );
}

export default Header;
