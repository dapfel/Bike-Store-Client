import React from "react";
import MyAppBar from "./AppBar";

function Header(props) {
  return (
    <header>
      <MyAppBar 
        onDisplayBikes={props.onDisplayBikes} 
        isLoggedIn={props.isLoggedIn} 
        onLogin={props.onLogin} 
        onLogout={props.onLogout}
        onCheckout={props.onCheckout}
        cart={props.cart}
      />
    </header>
  );
}

export default Header;
