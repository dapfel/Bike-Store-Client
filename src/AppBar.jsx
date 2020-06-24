import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AdaptiveMenu from './AdaptiveMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    height: 110,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    padding: 0,
    margin: '0 auto',
    width: '100%',
    maxWidth: '1300px',
    minHeight: 110,
    alignItems: 'center',
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
    display: 'block',
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
  }
}));

export default function MyAppBar(props) {

  const classes = useStyles();

  const [searchInputTerm, setSearchInputTerm] = useState("");

  function handleSearchInputChange(event) {
    setSearchInputTerm(event.target.value);
  }

  function handleSearchInputSubmit(event) {
    event.preventDefault();
    const queryParam = "searchTerm=" + searchInputTerm;
    fetch ("/bikes/search?" + queryParam)
    .then((res) => res.json())
    .then((data) => {
      props.onDisplayBikes(data.bikeData);
    });
  }

  return (
    <div className={classes.root} key="appbardiv">
    <AppBar position="static" key="appbar">
      <Toolbar className={classes.toolbar} key="toolbar">
        <img src="images/logo.png" alt="logo" className={classes.logo} />
        <div className={classes.search} key='searchdiv'>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <form onSubmit={handleSearchInputSubmit} key="searchForm">
          <InputBase
            key="searchInput"
            id="searchInput"
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchInputChange}
            value={searchInputTerm}
          />
          </form>
        </div>
        <AdaptiveMenu
          isLoggedIn={props.isLoggedIn}
          cart={props.cart} 
          onCheckout={props.onCheckout} 
          onLogout={props.onLogout} 
          onLogin={props.onLogin} 
        />
      </Toolbar>
    </AppBar>
  </div>
  );
}