import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import MainContent from "./components/Main-Content.jsx";
import { createStore } from "redux";
import reducer from "./store/reducer";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem("jwtToken");

if (token) {
  store.dispatch({ type: "ON_LOGIN", payload: token });
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main-content" element={<MainContent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
