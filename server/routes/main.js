//The file defines server related router
const express = require("express");
const router = express.Router();

//Router
//render index.ejs
router.get("", (req, res) => {
  const locals = {
    title: "NodeJS blog",
    description: "Yishan's NodeJS blog.",
  };
  res.render("index", { locals });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
