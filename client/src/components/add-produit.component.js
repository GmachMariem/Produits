import React, { Component } from "react";
import ProduitDataService from "../services/produit.service";

export default class AddProduit extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrixunitaire = this.onChangePrixunitaire.bind(this);
    this.onChangeQuantite = this.onChangeQuantite.bind(this);
    this.saveProduit = this.saveProduit.bind(this);
    this.newProduit = this.newProduit.bind(this);

    this.state = {
      id: null,
      nom: "",
      prixunitaire: "", 
      quantite: "",

      submitted: false
    };
  }

  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangePrixunitaire(e) {
    this.setState({
      prixunitaire: e.target.value
    });
  }
  onChangeQuantite(e) {
    this.setState({
      quantite: e.target.value
    });
  }


  saveProduit() {
    var data = {
      nom: this.state.nom,
      prixunitaire: this.state.prixunitaire,
      quantite: this.state.quantite
    };

    ProduitDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nom: response.data.nom,
          prixunitaire: response.data.prixunitaire,
          quantite: response.data.quantite,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduit() {
    this.setState({
      id: null,
      nom: "",
      prixunitaire: "",
      quantite: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduit}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nom">nom</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                required
                value={this.state.nom}
                onChange={this.onChangeNom}
                name="nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prixunitaire">prix</label>
              <input
                type="number" min="1" max="1000"
                className="form-control"
                id="prixunitaire"
                required
                value={this.state.prixunitaire}
                onChange={this.onChangePrixunitaire}
                name="prixunitaire"
              />
            </div>
            <div className="form-group">
              <label htmlFor="prixunitaire">Quantite</label>
              <input
               type="number" min="1" max="1000"
                className="form-control"
                id="quantite"
                required
                value={this.state.quantite}
                onChange={this.onChangeQuantite}
                name="quantite"
              />
            </div>

            <button onClick={this.saveProduit} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}