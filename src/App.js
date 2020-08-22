import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./components/Home"
import Play from "./components/Play"

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/play/">
            <Play />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
