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
        Material-UI
      </Link>
      <Link color="textSecondary" href="/getting-started/installation/" onClick={handleClick}>
        Core
      </Link>
      <Typography color="textPrimary">Copyright © {year}</Typography>
    </Breadcrumbs>
  );
}