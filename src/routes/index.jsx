import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Signup from "../pages/Signup";

function Routes() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token")) || "";

    if (!!token) {
      return setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Home
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/signup">
        <Signup authenticated={authenticated} />
      </Route>
    </Switch>
  );
}

export default Routes;
