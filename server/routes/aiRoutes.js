const express =
  require("express");

const router =
  express.Router();

const {
  generateTaskDescription,
} = require(
  "../controllers/aiController"
);

/*
  POST route
*/

router.post(
  "/generate-description",
  generateTaskDescription
);

module.exports = router;