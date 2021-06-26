import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals'

import { createBrowserHistory } from "history";

// Use a custom history module to access history outside of a component
const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};
const environment = process.env.NODE_ENV || 'development';
let client;
if (environment === "production") {
  ReactDOM.render(
    <React.StrictMode>
      <Auth0Provider
        domain="dev-0ncdlvtv.eu.auth0.com"
        clientId="3ReYjDKyiNnPCJ5DCVLlmDLWTGMbGDvv"
        redirectUri={"https://devbuictodo.netlify.app/app"}
        onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
}
else if (environment === "development") {
  ReactDOM.render(
    <React.StrictMode>
      <Auth0Provider
        domain="dev-0ncdlvtv.eu.auth0.com"
        clientId="3ReYjDKyiNnPCJ5DCVLlmDLWTGMbGDvv"
        redirectUri={"http://localhost:3000/app"}
        onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
