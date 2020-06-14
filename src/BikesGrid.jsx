import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import BikeCard from "./BikeCard";

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: '30px',
      marginBottom: '30px'
    }
  }));

export default function BikesGrid() {
    const classes = useStyles();
    
    return (
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>
          <Grid item xs={6} sm={3}>
              <BikeCard />
          </Grid>  
        </Grid>
    );
  }