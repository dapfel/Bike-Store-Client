import React from "react";
import SimpleBreadCrumbs from "./BreadCrumbs"

function Footer() {

  const style = {
    backgroundColor: '#3f51b5',
    padding: '30px',
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