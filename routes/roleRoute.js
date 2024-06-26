const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

// POST /api/roles
router.post("/", roleController.createRole);

// GET /api/roles
router.get("/", roleController.getRoles);

//put /api/roles
router.put("/:id", roleController.updateRole);

//delete /api/roles
router.delete("/:id", roleController.deleteRole);

module.exports = router;
