import React, {useState, Fragment} from 'react';
import { useForm } from "react-hook-form";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUpCompleteDialog from './SignUpCompleteDialog'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        The Bike Shack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpPage(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const [signInData, setSignInData] = useState({username: '', password: '', firstName: '', lastName: ''});
  const [complete, setComplete] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setSignInData(prevValues => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }

  function onSubmit(event) {
    const {username, password, firstName, lastName} = signInData;
    
    fetch('/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, password: password, firstName: firstName, lastName: lastName})
    })
    .then(res => {
        if (res.status === 200) {
          setSuccess(true);
          setComplete(true); 
        }
        else {
          setSuccess(false);
          setComplete(true); 
        }
    });
  }

  return (
    <Fragment>
    {!complete ?
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label= "First Name"
                value={signInData.firstName}
                onChange={handleChange}
                autoFocus
                inputRef={register({ maxLength: 20, pattern: /^[A-Za-z]+$/i })}
                error={errors.firstName}
                helperText={errors.firstName && "invalid first name"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={signInData.lastName}
                onChange={handleChange}
                autoComplete="lname"
                inputRef={register({ maxLength: 20, pattern: /^[A-Za-z]+$/i })}
                error={errors.lastName}
                helperText={errors.lastName && "invalid last name"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                value={signInData.username}
                onChange={handleChange}
                autoComplete="email"
                inputRef={register({ pattern: emailRegex })}
                error={errors.username}
                helperText={errors.username && "invalid email address"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={signInData.password}
                onChange={handleChange}
                autoComplete="current-password"
                inputRef={register({ minLength: 6 })}
                error={errors.password}
                helperText={errors.password && "password must be at least 6 characters"}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    :
    <SignUpCompleteDialog success={success} onClose={props.onClose}/>
    }
    </Fragment>
  );
}