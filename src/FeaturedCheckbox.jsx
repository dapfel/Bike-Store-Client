import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
  
const useStyles = makeStyles({
  root: {
    borderWidth: "1px",
    borderColor: "#000000",
    padding: "2px",
    marginRight: "2%",
    marginLeft: "3%",
    display: "inline-flex"
  },
});

export default function FeaturedCheckbox() {
  const classes = useStyles();

  const [isChecked, setIsChecked] = React.useState(true);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };
      
  return (  
    <div className={classes.root} >
    <FormControlLabel
      control={<Checkbox checked={isChecked} onChange={handleChange} name="checkedA" />}
      label="Featured"
    />
    </div>
  );
}