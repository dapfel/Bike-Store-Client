import React from "react";
import MyAppBar from "./AppBar";

function Header(props) {
  return (
    <header>
      <MyAppBar isLoggedIn={props.isLoggedIn} />
    </header>
  );
}

export default Header;
