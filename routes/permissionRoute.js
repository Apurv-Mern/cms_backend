const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");

// POST /api/roles
router.post("/", permissionController.createPermission);

// GET /api/roles
router.get("/", permissionController.getPermission);

// //put /api/roles
// router.put("/:id", permissionController.updateRole);

//delete /api/roles
router.delete("/:id", permissionController.deletePermission);

module.exports = router;
