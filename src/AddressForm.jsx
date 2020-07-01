import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function AddressForm(props) {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm();


  const [firstName, setFirstName] = useState(props.shippingAddress.firstName);
  const [lastName, setLastName] = useState(props.shippingAddress.lastName);
  const [address1, setAddress1] = useState(props.shippingAddress.address1);
  const [address2, setAddress2] = useState(props.shippingAddress.address2);
  const [city, setCity] = useState(props.shippingAddress.city);
  const [state, setState] = useState(props.shippingAddress.state);
  const [zip, setZip] = useState(props.shippingAddress.zip);
  const [country, setCountry] = useState(props.shippingAddress.country);
  const [useShippingAddress, setUseShippingAddress] = useState(props.useShippingAddress);

  function onSubmit(event) {
    props.onSetShippingAddress({firstName: firstName, lastName: lastName, address1: address1, address2: address2, city: city, state: state, zip: zip, country: country});
    props.onUseShippingAddress(useShippingAddress)
    props.handleNext();
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            inputRef={register({ maxLength: 20, pattern: /^[A-Za-z]+$/i })}
            error={errors.firstName}
            helperText={errors.firstName && "invalid first name"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            inputRef={register({ maxLength: 20, pattern: /^[A-Za-z]+$/i })}
            error={errors.lastName}
            helperText={errors.lastName && "invalid last name"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={(event) => setAddress1(event.target.value)}
            value={address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={(event) => setAddress2(event.target.value)}
            value={address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={(event) => setCity(event.target.value)}
            value={city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          id="state" 
          name="state" 
          label="State/Province/Region" 
          fullWidth 
          onChange={(event) => setState(event.target.value)}
          value={state}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={(event) => setZip(event.target.value)}
            value={zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            onChange={(event) => setCountry(event.target.value)}
            value={country}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            onChange={() => setUseShippingAddress(!useShippingAddress)}
            checked={useShippingAddress}
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        {props.activeStep !== 0 && (
          <Button onClick={props.handleBack} className={classes.button}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Next
        </Button>
      </div>
      </form>
    </React.Fragment>
  );
}