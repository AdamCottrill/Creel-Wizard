import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { QueryClient, QueryClientProvider } from "react-query";

import { DevTool } from "little-state-machine-devtools";

import FN011 from "./pages/FN011";
import Gear from "./pages/Gear";
import FN022 from "./pages/FN022";
import FN026 from "./pages/FN026";
import FN028 from "./pages/FN028";
import Result from "./pages/Result";

import ResetLink from "./resetLink";

createStore({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //refetchOnMount: false,
      refetchInterval: Infinity,
    },
  },
});

function App() {
  return (
    <StateMachineProvider>
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <Router basename={process.env.PUBLIC_URL}>
            <div className="row justify-content-between my-3">
              <div className="col-6">
                <h1>FN Project Setup Wizard</h1>
              </div>
              <div className="col-2">
                <ResetLink />
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
      </QueryClientProvider>
      {process.env.NODE_ENV !== "production" && <DevTool />}
    </StateMachineProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
