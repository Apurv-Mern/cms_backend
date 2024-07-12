const express = require("express");
const router = express.Router();

const rolePermissionsController = require("../controllers/rolePermissionController");

// GET /api/rolespermissions
router.get("/:roleId/permissions", rolePermissionsController.getAll);

module.exports = router;
