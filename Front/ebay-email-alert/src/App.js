import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "reactstrap";
import Topo from "./Component/topoComponent";
import formComponent from "./Component/formComponent";

function App() {
  return (
    <div className="App">
      <Topo />
      <formComponent />
    </div>
  );
}

export default App;
