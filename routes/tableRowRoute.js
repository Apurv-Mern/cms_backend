const express = require("express");
const router = express.Router();
const tableRowController = require("../controllers/tableRowController");

// POST /api/roles
router.post("/", tableRowController.create);

// // GET /api/roles
// router.get("/", tableRowController.getAll);

// //put /api/roles
// router.put("/:id", tableRowController.update);

// //delete /api/roles
// router.delete("/:id", tableRowController.delete);

module.exports = router;
