import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

export default function GenderExpansionPanel(props) {

  const [expanded, setExpanded] = useState(false);
  
  const handlePanelChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [radioState, setRadioState] = useState();
  
  const handleRadioChange = (event) => {
    setRadioState(event.target.value);
    props.onSubmitFilter({gender: radioState});
  };

  return (
    <ExpansionPanel square expanded={expanded === 'panel'} onChange={handlePanelChange('panel')}>
      <ExpansionPanelSummary aria-controls="paneld-content" id="paneld-header">
        <Typography>GENDER</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl component="fieldset">
          <RadioGroup aria-label="gender" name="gender" value={radioState} onChange={handleRadioChange}>
            <FormControlLabel value='Kids' control={<Radio />} label='Kids' key='Kids' />
            <FormControlLabel value='Mens' control={<Radio />} label='Mens' key='Mens' />
            <FormControlLabel value='Womens' control={<Radio />} label='Womens' key='Womens' />
          </RadioGroup>
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}