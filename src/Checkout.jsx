import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import CircularProgress from '@material-ui/core/CircularProgress';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  progress: {
    textAlign: 'center',
    marginTop: theme.spacing(8)
  }
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, props, myProps) {
  switch (step) {
    case 0:
      return  <AddressForm
                isLoggedIn={props.isLoggedIn} 
                shippingAddress={myProps.shippingAddress}
                onSetShippingAddress={myProps.onSetShippingAddress}
                useShippingAddress={myProps.useShippingAddress}
                onUseShippingAddress={myProps.onUseShippingAddress}
                activeStep={myProps.activeStep}
                handleNext={myProps.handleNext}
                handleBack={myProps.handleBack}
              />;
    case 1:
      return  <PaymentForm 
                creditCard={myProps.creditCard}
                billingAddress={myProps.billingAddress}
                isLoggedIn={props.isLoggedIn} 
                savedCreditCard={props.creditCard}
                useSavedCreditCard={myProps.useSavedCreditCard}
                onUseSavedCreditCard={myProps.onUseSavedCreditCard}
                useShippingAddress={myProps.useShippingAddress}
                saveCreditCard={myProps.saveCreditCard}
                onSaveCreditCard={myProps.onSaveCreditCard}
                onSetCreditCard={myProps.onSetCreditCard}
                onSetBillingAddress={myProps.onSetBillingAddress}
                activeStep={myProps.activeStep}
                handleNext={myProps.handleNext}
                handleBack={myProps.handleBack}
              />;
    case 2:
      return <Review 
                cart={props.cart} 
                shippingAddress={myProps.shippingAddress}  
                creditCard={myProps.creditCard}
                activeStep={myProps.activeStep}
                handleNext={myProps.handleNext}
                handleBack={myProps.handleBack}
              />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout(props) {
  const classes = useStyles();
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [fetchInProgress, setFetchInProgress] = React.useState(false);

  const [useShippingAddress, setUseShippingAddress] = React.useState(false);
  const [saveCreditCard, setSaveCreditCard] = React.useState(false);
  const [useSavedCreditCard, setUseSavedCreditCard] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState();

  let initAddress = {firstName: '', lastName: '', address1: '', address2: '', email: '', city: '', state: '', zip: '', country: ''};
  let initCreditCard = {name: '', num: '', exp: '', cvv: ''};
  const [shippingAddress, setShippingAddress] = React.useState(initAddress);
  const [creditCard, setCreditCard] = React.useState(initCreditCard);
  const [billingAddress, setBillingAddress] = React.useState(initAddress);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      processOrder();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function processOrder() {
    const order = {
      productIds: props.cart.map((bike) => {return bike._id}), 
      shippingAddress: shippingAddress,
      billingAddress: (useShippingAddress ? shippingAddress : billingAddress), 
      creditCard: creditCard, 
      saveCreditCard: saveCreditCard
    };
    setFetchInProgress(true);
    fetch('/processOrder', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(order)
    })
    .then((res) => res.json())
    .then((data) => {
        setFetchInProgress(false);
        if (data.num) {
          setOrderNumber(data.num);
          setActiveStep(activeStep + 1);
        } else {
          alert("Failed to process order");
        }
    });
  }

  const myProps = {
    useShippingAddress: useShippingAddress,
    onUseShippingAddress: setUseShippingAddress,
    onSetShippingAddress: setShippingAddress,
    onSetCreditCard: setCreditCard,
    onSetBillingAddress: setBillingAddress,
    saveCreditCard: saveCreditCard,
    onSaveCreditCard: setSaveCreditCard,
    useSavedCreditCard: useSavedCreditCard,
    onUseSavedCreditCard: setUseSavedCreditCard,
    billingAddress: billingAddress,
    shippingAddress: shippingAddress,
    creditCard: creditCard,
    activeStep: activeStep,
    handleNext: handleNext,
    handleBack: handleBack
   }
   
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            The Bike Shack
          </Typography>
        </Toolbar>
      </AppBar>
      {fetchInProgress ?
      <div className={classes.progress}>
        <div>
          <CircularProgress />
        </div>
        <Typography variant="h5" gutterBottom>
          Order processing. Do not refresh.
        </Typography>
      </div>
      :
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {"#" + orderNumber}. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.onOrderComplete}
                    className={classes.button}
                  >
                    {'Return to Home'}
                  </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, 
                  props, 
                  myProps)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
      }  
    </React.Fragment>
  );
}