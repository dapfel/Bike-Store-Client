import React, {useState, useEffect, Fragment} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CenterContent from './CenterContent';
import Checkout from "./Checkout"


function App() {

  const [displayedBikes, setDisplayedBikes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [creditCard, setCreditCard] = useState({});
  const [displayCheckoutPage, setDisplayCheckoutPage] = useState(false);

  useEffect(() => {
    fetch('/bikes/featured')
    .then((res) => res.json())
    .then((data) => {
      setDisplayedBikes(data.bikeData);
    });
  }, []);

  const setLoggedIn = (userData) => {
    setIsLoggedIn(true); 
    setCart(userData.userCart);
    setCreditCard(userData.creditCard);
  }

  const setLoggedOut = () => {
    setIsLoggedIn(false); 
    setCart([]);
    setCreditCard({});
  }

  const setDisplayBikes = (bikesToDisplay) => {
    setDisplayedBikes(bikesToDisplay);
  }

  const onCheckout = () => {
    setDisplayCheckoutPage(true);
  }

    return (
      <div className="App" key="appdiv">
        {displayCheckoutPage ? 
        <Checkout />
        :
        <Fragment key="headerfragment">
          <Header 
            key="header"
            onDisplayBikes={setDisplayBikes} 
            isLoggedIn={isLoggedIn} 
            onLogin={setLoggedIn} 
            onLogout={setLoggedOut}
            onCheckout={onCheckout}
            cart={cart}
          />
          <CenterContent bikesToDisplay={displayedBikes} onDisplayBikes={setDisplayBikes} />
          <Footer />
        </Fragment>
        }
      </div>
    );
}

export default App;