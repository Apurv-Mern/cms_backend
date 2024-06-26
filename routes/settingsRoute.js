const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsControllers");

const uploader = require("../middlewares/multer");

// POST /api/settings
router.post("/", uploader.single("value"), settingsController.createSettings);

// GET /api/settings
router.get("/", settingsController.getSettings);
//GET /api/settings/:id
router.get("/:id", settingsController.getSettingById);
//put /api/settings
router.put("/:id", uploader.single("value"), settingsController.updateSettings);

//delete /api/settings
router.delete("/:id", settingsController.deleteSettings);

module.exports = router;
