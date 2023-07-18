// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");




// all your routes here

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
  });
  
  router.post("/create", (req, res, next) => {
    let { celebrityName, occupation, catchPhrase } = req.body;
  
    Celebrity.create({ celebrityName, occupation, catchPhrase })
      .then((result) => {
        res.redirect("/celebrities/celebrities");
      })
      .catch((err) => {
        res.render(err, "/celebrities/new-celebrity");
      });
  }); 

  router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
      .then((result) => {
        res.render("celebrities/celebrities", { celebrities: result });
      })
      .catch((err) => next(err));
  });

module.exports = router;