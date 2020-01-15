import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Components/auth/login";
import Register from "./Components/auth/register";
import { LoadUserComponent } from "./LoadUser";
import { useUserStore } from "./Context/appStore";
import NavBar from "./Components/inc/NavBar";
import Footer from "./Components/inc/Footer";






function App() {
  const [, dispatch] = useUserStore();

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
            </Switch>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
