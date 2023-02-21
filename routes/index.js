var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.redirect("/catalog");
  // home screen olacak
});

module.exports = router;