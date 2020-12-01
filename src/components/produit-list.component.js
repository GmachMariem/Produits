import React, { Component } from "react";
import ProduitDataService from "../services/produit.service";
import { Link } from "react-router-dom";

export default class ProduitList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNom = this.onChangeSearchNom.bind(this);
    this.retrieveProduits = this.retrieveProduits.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduit = this.setActiveProduit.bind(this);
    this.removeAllProduits = this.removeAllProduits.bind(this);
    this.deleteProduit= this.deleteProduit.bind(this);
    this.searchNom= this.searchNom.bind(this);

    this.state = {
      produits: [],
      currentProduit: null,
      currentIndex: -1,
      searchNom: ""
    };
  }

 componentDidMount() {
    this.retrieveProduits();
  }

  onChangeSearchNom(e) {
    const searchNom = e.target.value;

    this.setState({
      searchNom: searchNom
    });
  }

  retrieveProduits() {
    ProduitDataService.getAll()
      .then(response => {
        this.setState({
          produits: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProduits();
    this.setState({
      currentProduit: null,
      currentIndex: -1
    });
  }

  setActiveProduit(produit, index) {
    this.setState({
      currentProduit: produit,
      currentIndex: index
    });
  }
  removeAllProduits() {
    ProduitDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNom() {
    ProduitDataService.findByNom(this.state.searchNom)
      .then(response => {
        this.setState({
          produits: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteProduit() {    
    ProduitDataService.delete(this.state.currentProduit.id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { searchNom, produits, currentProduit, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by nom"
              value={searchNom}
              onChange={this.onChangeSearchNom}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNom}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Produit List</h4>

          <ul className="list-group">
            {produits &&
              produits.map((produit, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduit(produit, index)}
                  key={index}
                >
                  {produit.nom}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProduits}
            
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProduit ? (
            <div>
              <h4>Produit</h4>
              <div>
                <label>
                  <strong>Nom:</strong>
                </label>{" "}
                {currentProduit.nom}
              </div>
              <div>
                <label>
                  <strong>PrixUnitaire:</strong>
                </label>{" "}
                {currentProduit.prixunitaire}
              </div>
              <div>
                <label>
                  <strong>Quantite:</strong>
                </label>{" "}
                {currentProduit.quantite }
              </div>

              <Link
                to={"/produits/" + currentProduit.id}
                className="m-2 btn btn-sm btn-warning"
              >
                Edit
              </Link>
              {' '}
              <button
              className="m-2 btn btn-sm btn-danger "
              onClick={this.deleteProduit}
            >
              Delete
            </button>
            </div>
            
          ) : (
            <div>
              <br />
              <p>Please click on a produit...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}