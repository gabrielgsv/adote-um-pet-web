import React from "react";
import {Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import ListPets from "./pages/ListPets"
import Pet from "./pages/Pet"

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/listpets" component={ListPets}/>
      <Route path="/pet" component={Pet}/>
    </Switch>
  )
}

export default Routes