const db = require("../models");
const Produit = db.produit;

// Create and Save a new Produit
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Produit
  const produit = new Produit({
    nom: req.body.nom,
    prixunitaire: req.body.prixunitaire,
    quantite: req.body.quantite 
  });

  // Save Produit in the database
  produit
    .save(produit)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Produit."
      });
    });
};

// Retrieve all Produit from the database.
exports.findAll = (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};
  
    Produit.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Produit."
        });
      });
  };

// Find a single Produit with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Produit.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Produit with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Produit with id=" + id });
      });
  };

// Update a Produit by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Produit.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Produit with id=${id}. Maybe Produit was not found!`
            });
          } else res.send({ message: "Produit was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Produit with id=" + id
          });
        });
    };

// Delete a Produit with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Produit.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Produit with id=${id}. Maybe Produit was not found!`
          });
        } else {
          res.send({
            message: "Produit was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Produit with id=" + id
        });
      });
  };

// Delete all Produit from the database.
exports.deleteAll = (req, res) => {
    Produit.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Produit were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Produit."
      });
    });
};

