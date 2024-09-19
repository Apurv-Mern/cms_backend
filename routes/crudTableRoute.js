const express = require("express");
const router = express.Router();
const crudTableController = require("../controllers/crudTableController");
const databaseController = require("../controllers/databaseController");
// POST /api/crud
router.post("/", crudTableController.create);

//get /api/crud
router.get("/:id", crudTableController.getById);
// //get /api/crud
// router.getAll("/", databaseController.getAll);

// //delete /api/roles
// router.delete("/:id", crudTableController.delete);

module.exports = router;
