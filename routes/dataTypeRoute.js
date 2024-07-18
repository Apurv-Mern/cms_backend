const express = require("express");
const router = express.Router();
const datatypeController = require("../controllers/datatypeController");

// POST /api/roles
router.post("/", datatypeController.create);

// GET /api/roles
router.get("/", datatypeController.getAll);

// //put /api/roles
// router.put("/:id", datatypeController.update);

// //delete /api/roles
// router.delete("/:id", datatypeController.delete);

module.exports = router;
