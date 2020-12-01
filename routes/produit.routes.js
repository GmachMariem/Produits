module.exports = app => {
  const produits = require("../controllers/produit.controller.js");

  var router = require("express").Router();


  // Create a new Produit
  router.post("/", produits.create);

  // Retrieve all Produit
  router.get("/", produits.findAll);


  // Retrieve a single Produit with id
  router.get("/:id", produits.findOne);

  // Update a Produit with id
  router.put("/:id", produits.update);

  // Delete a Produit with id
  router.delete("/:id", produits.delete);

  // Create a new Produit
  router.delete("/", produits.deleteAll);

  app.use('/api/produits', router);
};