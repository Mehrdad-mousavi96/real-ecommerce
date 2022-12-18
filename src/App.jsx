import React, { useReducer, useState } from "react";
import {
  Redirect,
  Route,
  BrowserRouter,
  Routes,
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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} exact element={<Login />} />
          <Route path={"register"} exact element={<Register />} />
          <Route path={"/dashboard"} exact element={<Dashboard />} />
          <Route path={"/store"} exact element={<Store />} />
          <Route path={"*"} exact element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
