//  Add your code here
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let celebritySchema = new Schema(
  {
    celebrityName: {
      type: String,
      require: true,
    },
    occupation: {
      type: String,
      require: true,
    },
    catchPhrase: {
      type: String,
      require: true,

    },
  },
  
  {
    timestamps: true,
  }
);

//schema para montar el modelo (estructura de un documento de la coleccion)
const Celebrity = mongoose.model("Celebrity", celebritySchema); //Modelo: clase para manipular documentos en una colección

//especificas qué va a devolver el require
module.exports = Celebrity;