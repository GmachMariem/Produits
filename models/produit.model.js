
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          nom: String,
          prixunitaire: Number,
          quantite: Number
        }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Produit = mongoose.model("produit", schema);
      return Produit;
    };