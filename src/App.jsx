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

  const onUpdateCart = (index) => {
    if (isLoggedIn) {
      fetch('/cartItems/' + cart[index]._id, {
        method: 'DELETE',
      })
      .then((res) => res.json());
    }
    setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
  }

  const onAddToCart = (newBike) => {
    if (isLoggedIn) {
      fetch('/cartItems/' + newBike._id, {
        method: 'POST',
      })
      .then((res) => res.json());
    }
    setCart([...cart, newBike]);
  }

  const onOrderComplete = () => {
    setCart([]);
    setDisplayCheckoutPage(false);
  }

    return (
      <div className="App">
        {displayCheckoutPage ? 
        <Checkout cart={cart} 
          creditCard={creditCard} 
          isLoggedIn={isLoggedIn}
          onOrderComplete={onOrderComplete}
        />
        :
        <Fragment>
          <Header 
            onDisplayBikes={setDisplayBikes} 
            isLoggedIn={isLoggedIn} 
            onLogin={setLoggedIn} 
            onLogout={setLoggedOut}
            onCheckout={onCheckout}
            onUpdateCart={onUpdateCart}
            cart={cart}
          />
          <CenterContent bikesToDisplay={displayedBikes} onDisplayBikes={setDisplayBikes} onAddToCart={onAddToCart} />
          <Footer />
        </Fragment>
        }
      </div>
    );
}

export default App;