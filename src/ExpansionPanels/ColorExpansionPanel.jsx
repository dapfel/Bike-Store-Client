import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

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
    list: {
      maxHeight: 200,
      overflow: 'auto'
    }
  }));

export default function ColorExpansionPanel(props) {
  const classes = useStyles();
  
  const [expanded, setExpanded] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [radioState, setRadioState] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetch('/bikeSpecList/color')
    .then((res) => res.json())
    .then((data) => {
      setColorList(data.specNameList);
      setRadioState(colorList.map((colorName, index) => {return ({index: index.toString(), checked: false})}));
      setLoadingData(false);
    });
  },[]);
  
  const handlePanelChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
  const handleRadioChange = (event) => {
    setRadioState(event.target.value);
    props.onSubmitFilter({color: radioState});
  };

  return (

    <ExpansionPanel square expanded={expanded === 'panel'} onChange={handlePanelChange('panel')}>
      <ExpansionPanelSummary aria-controls="paneld-content" id="paneld-header">
        <Typography>COLOR</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.list}>
        {loadingData ? <p>loading data...</p> :
        <FormControl component="fieldset">
          <RadioGroup aria-label="color" name="color" value={radioState} onChange={handleRadioChange}>
            {colorList.map((colorName, index) => {return (
              <FormControlLabel value={colorName} control={<Radio />} label={colorName} key={colorName} />
            )})}
          </RadioGroup>
        </FormControl>
        }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}