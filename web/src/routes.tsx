import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./pages/landing/landing";
import OrphanagesMap from "./pages/orphanagesMap/OrphanagesMap";
import CreateOrphanage from "./pages/createOrphanages/CreateOrphanage";
import Orphanage from "./pages/orphanage/Orphanage";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanage/:id" exact component={Orphanage} />
        <Route path="/orphanages/create" exact component={CreateOrphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
