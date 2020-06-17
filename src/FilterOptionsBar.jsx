import React from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { makeStyles } from '@material-ui/core/styles';
import FeaturedCheckbox from "./FeaturedCheckbox";

const useStyles = makeStyles({
    root: {
      backgroundColor: "#e6e6e6",
      marginBottom: "10px",
      padding: "20px"
    },
  });

function FilterOptionsBar() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <PriceRangeSlider />
        <FeaturedCheckbox />
      </div>
    );
  }
  
  export default FilterOptionsBar;