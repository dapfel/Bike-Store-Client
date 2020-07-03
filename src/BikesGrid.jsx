import React from 'react';
import Grid from "@material-ui/core/Grid";
import BikeCard from "./BikeCard";

export default function BikesGrid(props) {
    const bikesToDisplay = props.bikesToDisplay;
    
    return (
        <Grid container spacing={3}>
          {bikesToDisplay.map((bikeInfo, index) => { return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <BikeCard bikeInfo={bikeInfo} onAddToCart={props.onAddToCart} />
            </Grid> 
          );})} 
        </Grid>
    );
  }