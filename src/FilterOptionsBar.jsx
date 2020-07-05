import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PriceExpansionPanel from './ExpansionPanels/PriceExpansionPanel';
import GenderExpansionPanel from './ExpansionPanels/GenderExpansionPanel';
import DiciplineExpansionPanel from './ExpansionPanels/DiciplineExpansionPanel';
import ElectricExpansionPanel from './ExpansionPanels/ElectricExpansionPanel';
import WheelSizeExpansionPanel from './ExpansionPanels/WheelSizeExpansionPanel';
import MaterialExpansionPanel from './ExpansionPanels/MaterialExpansionPanel';
import ColorExpansionPanel from './ExpansionPanels/ColorExpansionPanel';
import BrandExpansionPanel from './ExpansionPanels/BrandExpansionPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '3px',
    minWidth: '250px',
    maxWidth: '250px'
  }
}));


export default function FilterOptionsBar(props) {
  const classes = useStyles();

  const [filterState, setFilterState] = useState([]);

  function handleSubmitFilter(newFilterOption) {
    const filter = newFilterState(filterState, newFilterOption);
    setFilterState(filter);
    let queryParams = "";
    filter.forEach((filterOption) => {
      if (filterOption.spec === "priceRange") {
        queryParams += "priceMin=" + filterOption.value.min + "&priceMax=" + filterOption.value.max + "&";
      } else {
        if (filterOption.value !== 'Any') {
          queryParams += filterOption.spec + "=" + filterOption.value + "&"
        }
      }
    });
    queryParams = queryParams.slice(0,-1);
    fetch('/bikes/filtered?' + queryParams)
    .then((res) => res.json())
    .then((data) => {
      props.onDisplayBikes(data.bikeData);
    });
  }

  return (
    <div className={classes.root}>
      <PriceExpansionPanel onSubmitFilter={handleSubmitFilter} />
      <BrandExpansionPanel onSubmitFilter={handleSubmitFilter} />
      <GenderExpansionPanel onSubmitFilter={handleSubmitFilter} />
      <DiciplineExpansionPanel onSubmitFilter={handleSubmitFilter} />
      <ElectricExpansionPanel onSubmitFilter={handleSubmitFilter} />
      <WheelSizeExpansionPanel onSubmitFilter={handleSubmitFilter} />
      <MaterialExpansionPanel onSubmitFilter={handleSubmitFilter} />
      <ColorExpansionPanel onSubmitFilter={handleSubmitFilter} />
    </div>
  );
}

function newFilterState(oldFilter, newFilterOption) {
  let newFilter = oldFilter.filter((option) => {
    return option.spec !== newFilterOption.spec;
  })
  newFilter.push(newFilterOption);
  return newFilter;
}