import React, { useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NoMatchPage from "./components/NoMatchPage";
import Register from "./components/Register";
import Store from "./components/Store";
import { UserContext } from "./useContext";

const initUser = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "logout":
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
      };
    case "login":
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
      };
    default:
      return state;
  }
};

const App = () => {
  const [user, dispatch] = useReducer(userReducer, initUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path={["/", "/login", "/signin"]} exact component={Login} />
          <Route path={["/register", "/signup"]} exact component={Register} />
          <Route path={"/dashboard"} exact component={Dashboard} />
          <Route path={"/store"} exact component={Store} />
          <Route path={"*"} exact component={NoMatchPage} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
