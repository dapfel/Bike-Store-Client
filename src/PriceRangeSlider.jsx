import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    borderWidth: "1px",
    borderColor: "#000000",
    padding: "2px",
    width: 300,
    display: "inline-flex",
    marginRight: "2%"
  },
});

function valuetext(value) {
    return `${value}$`;
  }
  
  export default function PriceRangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState([0, 1000]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function numFormatter (value) {
        return "$" + value.toString();
    }
  
    return (
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Price range
        </Typography>
        <Slider
          min={0}
          max={1000}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          valueLabelFormat={value => <div>{numFormatter(value)}</div>}
        />
      </div>
    );
}