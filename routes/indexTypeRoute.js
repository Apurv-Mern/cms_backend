const express = require("express");
const router = express.Router();
const indexTypeController = require("../controllers/indexTypeController");

// POST /api/roles
router.post("/", indexTypeController.create);

// GET /api/roles
router.get("/", indexTypeController.getAll);

// //put /api/roles
// router.put("/:id", datatypeController.update);

// //delete /api/roles
// router.delete("/:id", datatypeController.delete);

module.exports = router;
