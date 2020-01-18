import React, { useEffect, useCallback } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/auth/login";
import Register from "./Components/auth/register";
import Shops from "./Components/shops/shops";
import { useUserStore } from "./Context/appStore";
import NavBar from "./Components/inc/NavBar";
import Footer from "./Components/inc/Footer";
import { loadUser } from "./actions/userAction";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./Components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [, dispatch] = useUserStore();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    loadUser(stableDispatch);
  }, [stableDispatch]);
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Router>
        <div className="App">
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/shops" component={Shops} />
            </Switch>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
