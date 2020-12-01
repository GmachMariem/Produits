import React, { Component } from "react";
import ProduitDataService from "../services/produit.service";

export default class Produit extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrixunitaire = this.onChangePrixunitaire.bind(this);
    this.onChangeQuantite = this.onChangeQuantite.bind(this);
    this.getProduit = this.getProduit.bind(this);
    this.updateProduit = this.updateProduit.bind(this);
    this.deleteProduit= this.deleteProduit.bind(this);

    this.state = {
      currentProduit: {
        id: null,
        nom: "",
        prixunitaire: "",
        quantite: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduit(this.props.match.params.id);
  }

  onChangeNom(e) {
    const nom = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduit: {
          ...prevState.currentProduit,
          nom: nom
        }
      };
    });
  }

  onChangePrixunitaire(e) {
    const prixunitaire = e.target.value;
    
    this.setState(prevState => ({
      currentProduit: {
        ...prevState.currentProduit,
        prixunitaire: prixunitaire
      }
    }));
  }
  onChangeQuantite(e) {
    const quantite = e.target.value;
    
    this.setState(prevState => ({
      currentProduit: {
        ...prevState.currentProduit,
        quantite: quantite
      }
    }));
  }

  getProduit(id) {
    ProduitDataService.get(id)
      .then(response => {
        this.setState({
          currentProduit: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

 

  updateProduit() {
    ProduitDataService.update(
      this.state.currentProduit.id,
      this.state.currentProduit
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The produit was updated successfully!"
        });
        this.props.history.push('/produits')
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduit() {    
    ProduitDataService.delete(this.state.currentProduit.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/produits')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProduit } = this.state;

    return (
      <div>
        {currentProduit ? (
          <div className="edit-form">
            <h4>Produit</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nom">nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={currentProduit.nom}
                  onChange={this.onChangeNom}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Prixunitaire</label>
                <input
                  type="number" min="1" max="1000"
                  className="form-control"
                  id="prixunitaire"
                  value={currentProduit.prixunitaire}
                  onChange={this.onChangePrixunitaire}
                />
              </div>
              <div className="form-group ">
                <label htmlFor="prix">Quantite</label>
                <input
                  type="number" min="1" max="1000"
                  className="form-control"
                  id="quantite"
                  value={currentProduit.quantite}
                  onChange={this.onChangeQuantite}
                />
              </div>
            </form>

           

            <button
              className="m-2 btn btn-sm btn-danger"
              onClick={this.deleteProduit}
            >
              Delete
            </button>

            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateProduit}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}