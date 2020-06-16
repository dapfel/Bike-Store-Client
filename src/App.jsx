import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import BikesGrid from "./BikesGrid";

function App() {

  const [displayedBikes, setDisplayedBikes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [creditCard, setCreditCard] = useState({});

  setLoggedIn = (userData) => {
    setIsLoggedIn(true); 
    setCart(userData.userCart);
    setCreditCard(userData.creditCard);
  }

  setLoggedOut = () => {
    setIsLoggedIn(false); 
    setCart([]);
    setCreditCard({});
  }

  setDisplayBikes = (bikesToDisplay) => {
    setDisplayedBikes(bikesToDisplay);
  }
  
  function getFeaturedBikes() {
    const res = await fetch('/bikes/featured');
    const body = await res.json();

    if (res.status === 200) {
      setDisplayedBikes(res.body.bikeData);
    }
    else {
      // error message
    }
  }

    return (
      <div className="App">
        <Header 
          onDisplayBikes={setDisplayBikes} 
          isLoggedIn={isLoggedIn} 
          onLogin={setLoggedIn} 
          onLogout={setLoggedOut}/>
        <BikesGrid />
        <p>{getFeaturedBikes}</p>
        <Footer />
      </div>
    );
}

export default App;