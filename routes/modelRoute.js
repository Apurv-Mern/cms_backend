const express = require("express");
const router = express.Router();
const modelNameController = require("../controllers/modelNameController");

// POST /api/roles
router.post("/", modelNameController.create);

// // GET /api/roles
// router.get("/", roleController.getRoles);

// //put /api/roles
// router.put("/:id", roleController.updateRole);

// //delete /api/roles
// router.delete("/:id", roleController.deleteRole);

// // GET /api/rolespermissions
// router.get("/:roleId/permissions", roleController.getRolePermissions);

module.exports = router;
