import React, {Fragment,  useEffect, useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withResizeDetector } from 'react-resize-detector';
import SignUpDialog from "./SignUpDialog";
import LoginDialog from "./LoginDialog";
import LogoutButton from "./LogoutButton";
import CartDialog from './CartDialog';
import MainMenu from "./MainMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        }
      },
      menu: {
        position: 'absolute',
        right: 0
      }
  }));

export default function AdaptiveMenu(props) {
  const classes = useStyles();

  const AdaptiveComponent = ({width, height}) => {
    const [collapseMenu, setCollapseMenu] = useState(false);
     
    useEffect(() => {
    setCollapseMenu(width < 170 ? true : false);

    }, [width]);

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
      <Fragment>
      {!collapseMenu ? 
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <form onSubmit={handleSearchInputSubmit}>
          <InputBase
            key="searchInput"
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
      : null}
      {collapseMenu ?
        <div className={classes.menu}>
        <MainMenu 
          isLoggedIn={props.isLoggedIn}
          cart={props.cart} 
          onCheckout={props.onCheckout} 
          onLogout={props.onLogout} 
          onLogin={props.onLogin} 
        />
        </div>
      :
      <div className={classes.root}>
       <CartDialog cart={props.cart} onUpdateCart={props.onUpdateCart} onCheckout={props.onCheckout}/>
        {props.isLoggedIn ? 
          <LogoutButton onLogout={props.onLogout} /> 
          :
          <Fragment>
            <LoginDialog onLogin={props.onLogin} />
            <SignUpDialog /> 
          </Fragment>
        }
      </div>
      }
      </Fragment>
    );
  }

  const AdaptiveWithDetector = withResizeDetector(AdaptiveComponent);

  return (
    <AdaptiveWithDetector key="adaptivewithdetector" />
  )
}



