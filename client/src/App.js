import { Router, Switch, Route } from "react-router-dom"
import { createClient, Provider } from 'urql';
import Main from "./components/main/Main"
import FirstPage from './components/firstPage/FirstPage';
import Register from "./components/register/Register";
import Login from './components/login/Login'
import { createBrowserHistory } from "history";

// Use a custom history module to access history outside of a component
const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};

function App() {

  const environment = process.env.NODE_ENV || 'development';
  let client;
  if (environment === "production") {
    client = createClient({
      url: 'https://devbuictodo-backend.herokuapp.com/'
    });
  }
  else if (environment === "development") {
    client = createClient({
      url: 'http://localhost:4000'
    });
  }

  return (
    <Provider value={client}>
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/app*">
              <Main />
            </Route>

            <Route exact path="/">
              <FirstPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
