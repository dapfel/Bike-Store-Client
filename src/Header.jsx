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
      />
    </header>
  );
}

export default Header;
