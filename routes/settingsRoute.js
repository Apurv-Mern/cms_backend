const express = require("express");
const router = express.Router();
// const settingsController = require("../controllers/settingsControllers");
const {
  authorizePermission,
} = require("../middlewares/dynamicAuthorizePermission");
const {
  dynamicAuthorizePermission,
} = require("../middlewares/dynamicAuthorizePermission");
const uploader = require("../middlewares/multer");

// // POST /api/settings
// router.post(
//   "/",
//   dynamicAuthorizePermission,
//   uploader.single("value"),
//   settingsController.createSettings
// );

// // GET /api/settings
// router.get("/", dynamicAuthorizePermission, settingsController.getSettings);
// //GET /api/settings/:id
// router.get(
//   "/:id",
//   dynamicAuthorizePermission,
//   settingsController.getSettingById
// );
// //put /api/settings
// router.put(
//   "/:id",
//   dynamicAuthorizePermission,
//   uploader.single("value"),
//   settingsController.updateSettings
// );

// //delete /api/settings
// router.delete(
//   "/:id",
//   dynamicAuthorizePermission,
//   settingsController.deleteSettings
// );

module.exports = router;
