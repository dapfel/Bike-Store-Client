import React, {useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import TextField from '@material-ui/core/TextField';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MAX_PRICE = 5000;

const ExpansionPanel = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiExpansionPanel);
  
  const ExpansionPanelSummary = withStyles({
    root: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, .03)'
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiExpansionPanelSummary);
  
  const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiExpansionPanelDetails);

  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: 'center'
    },
    textField: {
      padding: 5,
      maxWidth: '40%'
    },
    button: {
      width: '90%',
      padding: 5
    }
  }));

export default function PriceExpansionPanel(props) {
  const classes = useStyles();

  const [priceRange, setPriceRange] = useState({min: 0, max: MAX_PRICE});

  const [expanded, setExpanded] = useState(false);
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function handlePriceRangeChange(event) { 
    if (event.target.value) {
      if (event.target.name === "minPrice") {
        setPriceRange({...priceRange, min: parseInt(event.target.value)})
      }
      else {
        setPriceRange({...priceRange, max: parseInt(event.target.value)})
      }
    } else {
      if (event.target.name === "minPrice") {
        setPriceRange({...priceRange, min: ''})
      }
      else {
        setPriceRange({...priceRange, max: ''})
      }
    }
  }

  function handlePriceRangeSubmit(event) {
    event.preventDefault();
    const priceR = {...priceRange}
    if (priceR.min === '') {
      priceR.min = 0;
    }
    if (priceR.max === '') {
      priceR.max = 0;
    }
    props.onSubmitFilter({spec: 'priceRange', value: priceR});
  }

  return (
    <ExpansionPanel square expanded={expanded === 'panel'} onChange={handleChange('panel')}>
      <ExpansionPanelSummary aria-controls="paneld-content" id="paneld-header">
        <Typography>FILTER BY PRICE</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.root}>
        <form noValidate autoComplete="off" onSubmit={handlePriceRangeSubmit}>
          <TextField className={classes.textField} name="minPrice" label="Min Price ($)" variant="outlined" value={priceRange.min} onChange={handlePriceRangeChange} />
          <TextField className={classes.textField} name="maxPrice" label="Max Price ($)" variant="outlined" value={priceRange.max} onChange={handlePriceRangeChange} />
          <Button type="submit" className={classes.button} variant="contained" color="secondary">
            Filter
          </Button>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}