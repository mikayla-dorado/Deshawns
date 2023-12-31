import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { DogDetails } from "./Dogs/DogDetails";
import { AddDog } from "./Dogs/AddDog";
import { Walkers } from "./Walkers/Walkers";
import { AssignWalkers } from "./Walkers/AssignWalkers";
import { Cities } from "./Cities/Cities";
import { EditWalkerCities } from "./Walkers/EditWalkerCities";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="dog-details">
          <Route path=":dogId" element={<DogDetails />} />
        </Route>
        <Route path="adddog" element={<AddDog />} />
        <Route path="walkers" element={<Walkers />} />
        <Route path="assignwalkers" element={<AssignWalkers />} />
        <Route path="cities" element={<Cities />} />
        <Route path="editwalker">
          <Route path=":walkerId" element={<EditWalkerCities />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
