import React from "react";
import SimpleBreadCrumbs from "./BreadCrumbs"

function Footer() {

  const style = {
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <footer style={style}>
      <SimpleBreadCrumbs />
    </footer>
  );
}

export default Footer;