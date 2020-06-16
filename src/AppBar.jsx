import React, {Fragment} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SignUpDialog from "./SignUpDialog";
import LoginDialog from "./LoginDialog";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: '5%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: '10%',
      width: '50%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  button: {
    marginLeft: '6px',
    marginRight: '6px'
  }
}));

export default function MyAppBar(props) {
  const classes = useStyles();

  const [searchInputTerm, setSearchInputTerm] = useState("");

  function handleSearchInputChange(event) {
    const value = event.target;
    setSearchInputTerm(value);
  }

  function handleSearchInputSubmit(event) {
    const queryParam = "searchTerm=" + searchInputTerm;
    fetch ("/bikes/search?" + queryParam)
    .then(res => {
    if (res.status === 200) {
      props.onDisplayBikes(res.body.bikeData);
    }
    else {
      // error
    }});
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            The Bike Store
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Form onSubmit={handleSearchInputSubmit}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchInputChange}
              value={searchInputTerm}
            />
            </Form>
          </div>
          <Button variant="contained" color="secondary" className={classes.button}>
            <ShoppingCartIcon /> 
            Cart
          </Button>
          {props.isLoggedIn ? 
            <LogoutButton onLogout={props.onLogout} /> 
            :
            <Fragment>
            <LoginDialog onLogin={props.onLogin} />
            <SignUpDialog /> 
            </Fragment>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}