import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilterOptionsBar from './FilterOptionsBar';
import BikesGrid from './BikesGrid';

const useStyles = makeStyles((theme) => ({
    root: {
      alignItems: 'flex-start',
      maxWidth: '1300px',
      margin: '30px auto',
      display: 'flex'
    }
  }));

export default function CenterContent(props) {
    
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilterOptionsBar onDisplayBikes={props.onDisplayBikes} />
      <BikesGrid bikesToDisplay={props.bikesToDisplay} onAddToCart={props.onAddToCart} />
    </div>
  );
}