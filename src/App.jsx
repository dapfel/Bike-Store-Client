import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import BikesGrid from "./BikesGrid";
import FilterOptionsBar from "./FilterOptionsBar";
import Checkout from "./Checkout"


function App() {

  const [displayedBikes, setDisplayedBikes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [creditCard, setCreditCard] = useState({});
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [displayCheckoutPage, setDisplayCheckoutPage] = useState(false);

  useEffect(() => {
    fetch('/bikes/featured', (res) => {
      if (res.status === 200) {
      setDisplayedBikes(res.body.bikeData);
    }
    else {
      // error message
    }});
  });

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

  const onSearch = () => {
    setSearchCompleted(true);
  }

  const onCheckout = () => {
    setDisplayCheckoutPage(true);
  }

    return (
      <div className="App">
        {displayCheckoutPage ? 
        <Checkout />
        :
        <React.Fragment>
          <Header 
            onDisplayBikes={setDisplayBikes} 
            isLoggedIn={isLoggedIn} 
            onLogin={setLoggedIn} 
            onLogout={setLoggedOut}
            onSearch={onSearch}
            onCheckout={onCheckout}
            cart={cart}
          />
          {searchCompleted ? <FilterOptionsBar /> : null}
          <BikesGrid bikesToDisplay={displayedBikes} />
          <Footer />
        </React.Fragment>
        }
      </div>
    );
}

export default App;