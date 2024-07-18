const express = require("express");
const router = express.Router();
const databaseController = require("../controllers/databaseController");

// POST /api/roles
router.post("/", databaseController.create);

// GET /api/roles
router.get("/", databaseController.getAll);

//put /api/roles
router.put("/:id", databaseController.update);

//delete /api/roles
router.delete("/:id", databaseController.delete);

module.exports = router;
