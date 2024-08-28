const express = require("express");
const router = express.Router();
const crudTableController = require("../controllers/crudTableController");

// POST /api/roles
router.post("/", crudTableController.create);

// //put /api/roles
// router.put("/:id", crudTableController.update);

// //delete /api/roles
// router.delete("/:id", crudTableController.delete);

module.exports = router;
