import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function SimpleBreadcrumbs() {
  let year = new Date().getFullYear();

  return (
    <Breadcrumbs className="breadcrumbs" aria-label="breadcrumb">
      <Link color="textSecondary" href="/" onClick={handleClick}>
        The Bike Shack
      </Link>
      <Link color="textSecondary" href="/" onClick={handleClick}>
        Terms
      </Link>
      <Typography color="textPrimary">Copyright © {year}</Typography>
    </Breadcrumbs>
  );
}