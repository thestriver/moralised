import { useState } from "react";
import moralis from "moralis";
import "./App.css";
import Dashboard from "./components/Dashboard";
import img1 from "./images/decoration-star.png";
import img2 from "./images/dash.jpeg";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;
const initialUser = moralis.User.current();

function App() {
  const [user, setUser] = useState(initialUser);

  const onLogin = async () => {
    const user = await moralis.authenticate();
    setUser(user);
  };

  return (
    <div className="App">
      {user ? (
        <Dashboard />
      ) : (
        <div>
          {/* Nav */}
          <nav
            id="navbarExample"
            class="navbar navbar-expand-lg fixed-top navbar-light"
            aria-label="Main navigation"
          >
            <div class="container">
              <a class="navbar-brand logo-text py-3" href="/">
                Moralised
              </a>
            </div>
          </nav>
          {/* hero */}
          <header id="header" class="header">
            <img class="decoration-star" src={img1} alt="alternative" />
            <img class="decoration-star-2" src={img1} alt="alternative" />
            <div class="container">
              <div class="row">
                <div class="col-lg-7 col-xl-5">
                  <div class="text-container">
                    <h1 class="h1-large">Moralised</h1>
                    <p class="p-large">
                      Your minimalist ETH dashboard. See your last transactions
                      and tokens balance.
                    </p>
                    <button class="btn-outline-lg" onClick={onLogin}>
                      Login
                    </button>
                  </div>
                </div>
                <div class="col-lg-5 col-xl-7 rounded">
                  <div class="image-container ">
                    <img
                      class="img-fluid rounded"
                      src={img2}
                      alt="alternative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* hero */}
        </div>
      )}
    </div>
  );
}

export default App;
