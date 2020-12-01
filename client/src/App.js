import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduit from "./components/add-produit.component";
import Produit from "./components/produit.component";
import ProduitList from "./components/produit-list.component";



class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
      
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/produits"} className="nav-link">
                Produits
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={[ "/produits"]} component={ProduitList} />
            <Route exact path="/add" component={AddProduit} />
            <Route path="/produits/:id" component={Produit} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;