import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme } from "@material-ui/core/styles";
import { UserProvider } from "./Context/appStore";





ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>,
    document.getElementById("root")
);