import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

export default function PaymentForm(props) {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm();

  const [creditCardName, setCreditCardName] = useState(props.creditCard.name);
  const [creditCardNum, setCreditCardNum] = useState(props.creditCard.num);
  const [creditCardExp, setCreditCardExp] = useState(props.creditCard.exp);
  const [creditCardCvv, setCreditCardCvv] = useState(props.creditCard.cvv);
  const [address1, setAddress1] = useState(props.billingAddress.address1);
  const [address2, setAddress2] = useState(props.billingAddress.address2);
  const [city, setCity] = useState(props.billingAddress.city);
  const [state, setState] = useState(props.billingAddress.state);
  const [zip, setZip] = useState(props.billingAddress.zip);
  const [country, setCountry] = useState(props.billingAddress.country);
  const [useSavedCreditCard, setUseSavedCreditCard] = useState(props.useSavedCreditCard);
  const [saveCreditCard, setSaveCreditCard] = useState(props.saveCreditCard);

  let savedCreditCardInfo = false;
  if (props.savedCreditCard) {
    savedCreditCardInfo = props.savedCreditCard.num.substring(12,16) + " " + props.savedCreditCard.exp;
  }

  function onSubmit() {
    if (useSavedCreditCard) {
      props.onSetCreditCard(props.savedCreditCard);
    } else {
      props.onSetCreditCard({name: creditCardName, num: creditCardNum, exp: creditCardExp, cvv: creditCardCvv});
    }
    props.onSetBillingAddress({firstName: '', lastName: '', address1: address1, address2: address2, city: city, state: state, zip: zip, country: country});
    props.onUseSavedCreditCard(useSavedCreditCard);
    props.onSaveCreditCard(saveCreditCard);
    props.handleNext();
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {props.isLoggedIn && savedCreditCardInfo ?
          <Grid item xs={12}>
            <FormControlLabel
              checked={useSavedCreditCard}
              control={<Checkbox color="secondary" name="savedCard" value="yes" />}
              label={"Use saved credit card: xxxx-xxxx-xxxx-" + savedCreditCardInfo}
              onChange={() => setUseSavedCreditCard(!useSavedCreditCard)}
            />
          </Grid>
        : null}
        {!useSavedCreditCard ?
        <React.Fragment>
        <Grid item xs={12} md={6}>
          <TextField 
            required id="cardName" 
            name="name" 
            label="Name on card" 
            fullWidth autoComplete="cc-name" 
            onChange={(event) => setCreditCardName(event.target.value)} 
            value={creditCardName} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="num"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            onChange={(event) => setCreditCardNum(event.target.value)} 
            value={creditCardNum} 
            inputRef={register({ pattern: ccRegex })}
            error={errors.num}
            helperText={errors.num ? "invalid card number" : "enter 16 digits only"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            required 
            id="expDate"
            name="exp" 
            label="Expiry date" 
            fullWidth autoComplete="cc-exp" 
            onChange={(event) => setCreditCardExp(event.target.value)} 
            value={creditCardExp} 
            inputRef={register({ pattern: /^(?:0?[1-9]|1[0-2]) *\/ *[1-9][0-9]$/ })}
            error={errors.exp}
            helperText={errors.exp ? "invalid expiration date" : "mm/yy"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            onChange={(event) => setCreditCardCvv(event.target.value)} 
            value={creditCardCvv} 
            inputRef={register({ pattern: /^[0-9]{3,4}$/ })}
            error={errors.cvv}
            helperText={errors.cvv ? "invalid cvv" : "Last three digits on signature strip"}
          />
        </Grid>
        {props.isLoggedIn ?
        <Grid item xs={12}>
          <FormControlLabel
            checked={saveCreditCard}
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
            onChange={() => setSaveCreditCard(!saveCreditCard)}
          />
        </Grid>
        : null}
        </React.Fragment>
        : null}
      </Grid>
      {!props.useShippingAddress ?
      <Grid>
        <Typography variant="h6" gutterBottom>
          Billing address
        </Typography>
        <Grid container spacing={3}>
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
        </Grid>
      </Grid>
      : null}
      <div className={classes.buttons}>
        {props.activeStep !== 0 && (
          <Button onClick={props.handleBack} className={classes.button}>
            Back
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Next
        </Button>
      </div>
      </form>
    </React.Fragment>
  );
}