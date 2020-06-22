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
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} md={3} sm={4}>
              <BikeCard />
          </Grid>  
        </Grid>
    );
  }