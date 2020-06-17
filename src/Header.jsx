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
        onSearch={props.onSearch}
        onCheckout={props.onCheckout}
        cart={props.cart}
      />
    </header>
  );
}

export default Header;
