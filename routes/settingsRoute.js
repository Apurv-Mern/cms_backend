const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsControllers");
const { authorizePermission } = require("../middlewares/authorizePermission");
const uploader = require("../middlewares/multer");

// POST /api/settings
router.post(
  "/",
  authorizePermission("settings_add"),
  uploader.single("value"),
  settingsController.createSettings
);

// GET /api/settings
router.get(
  "/",
  authorizePermission("settings_read"),
  settingsController.getSettings
);
//GET /api/settings/:id
router.get(
  "/:id",
  authorizePermission("settings_read"),
  settingsController.getSettingById
);
//put /api/settings
router.put(
  "/:id",
  authorizePermission("settings_edit"),
  uploader.single("value"),
  settingsController.updateSettings
);

//delete /api/settings
router.delete(
  "/:id",
  authorizePermission("settings_delete"),
  settingsController.deleteSettings
);

module.exports = router;
