import React, {Fragment,  useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      }
  }));

export default function AdaptiveMenu(props) {
  const classes = useStyles();

  const AdaptiveComponent = ({width, height}) => {
    const [collapseMenu, setCollapseMenu] = useState(false);
     
    useEffect(() => {
    setCollapseMenu(width < 150 ? true : false);

    }, [width]);
     
    return (    
      <div className={classes.root}>
      {collapseMenu ?
        <MainMenu
          isLoggedIn={props.isLoggedIn}
          cart={props.cart} 
          onCheckout={props.onCheckout} 
          onLogout={props.onLogout} 
          onLogin={props.onLogin} 
        />
      :
        <Fragment>
           <CartDialog cart={props.cart} onUpdateCart={props.onUpdateCart} onCheckout={props.onCheckout}/>
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
    );
  }

  const AdaptiveWithDetector = withResizeDetector(AdaptiveComponent);

  return (
    <AdaptiveWithDetector key="adaptivewithdetector" />
  )
}



