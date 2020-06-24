import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import BikeCard from "./BikeCard";

const useStyles = makeStyles((theme) => ({

  }));

export default function BikesGrid(props) {
    const classes = useStyles();
    const bikesToDisplay = props.bikesToDisplay;
    
    return (
        <Grid container spacing={3} className={classes.root}>
          {bikesToDisplay.map((bikeInfo, index) => { return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <BikeCard bikeInfo={bikeInfo} />
            </Grid> 
          );})} 
        </Grid>
    );
  }