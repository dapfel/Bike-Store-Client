import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

export default function ElectricExpansionPanel(props) {

  const [expanded, setExpanded] = useState(false);
  
  const handlePanelChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [checkedState, setCheckedState] = useState(true);
  
  const handleCheckboxChange = (event) => {
    setCheckedState(!checkedState);
    props.onSubmitFilter({electric: checkedState});
  };

  return (
    <ExpansionPanel square expanded={expanded === 'panel'} onChange={handlePanelChange('panel')}>
      <ExpansionPanelSummary aria-controls="paneld-content" id="paneld-header">
        <Typography>ELECTRIC</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedState.checkedElectric}
            onChange={handleCheckboxChange}
            name="checkedElectric"
            color="secondary"
          />
        }
        label="No"
      />
    </FormGroup>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}