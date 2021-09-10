import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import FN011 from "./pages/FN011";
import Gear from "./pages/Gear";
import FN022 from "./pages/FN022";
import FN026 from "./pages/FN026";
import FN028 from "./pages/FN028";
import Result from "./pages/Result";

//import "./styles.css";

createStore({});

function App() {
  return (
    <StateMachineProvider>
      <div className="container">
        <Router basename={process.env.PUBLIC_URL}>
          <div className="row justify-content-between my-3">
            <div className="col-6">
              <h1>FN Project Setup Wizard</h1>
            </div>
            <div className="col-2">
              <Link to="/">Reset</Link>
            </div>
          </div>

          <Route exact path="/" component={FN011} />
          <Route path="/fn022" component={FN022} />
          <Route path="/fn026" component={FN026} />
          <Route path="/fn028" component={FN028} />
          <Route path="/gear" component={Gear} />
          <Route path="/result" component={Result} />
        </Router>
      </div>
    </StateMachineProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
