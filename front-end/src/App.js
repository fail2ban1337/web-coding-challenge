import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Components/auth/login";
import { LoadUserComponent } from "./LoadUser";
import { useUserStore } from "./Context/appStore";
import NavBar from "./Components/inc/NavBar";





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
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
