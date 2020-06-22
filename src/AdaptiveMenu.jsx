import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SignUpDialog from "./SignUpDialog";
import LoginDialog from "./LoginDialog";
import LogoutButton from "./LogoutButton";
import CartDialog from './CartDialog';
import MainMenu from "./MainMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
  }));

export default function AdaptiveMenu(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    {props.collapseMenu ?
      <MainMenu
        isLoggedIn={props.isLoggedIn}
        cart={props.cart} 
        onCheckout={props.onCheckout} 
        onLogout={props.onLogout} 
        onLogin={props.onLogin} 
      />
    :
      <Fragment>
         <CartDialog cart={props.cart} onCheckout={props.onCheckout}/>
         {props.isLoggedIn ? 
           <LogoutButton onLogout={props.onLogout} /> 
         :
           <Fragment>
             <LoginDialog onLogin={props.onLogin} />
             <SignUpDialog /> 
           </Fragment>
         }
      </Fragment>
    }
  </div>
  )
}



