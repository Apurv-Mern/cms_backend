const express = require("express");
const router = express.Router();
const FrontendRouteStoreController = require("../controllers/frontendRouteStoreController");

// POST /api/routing
router.post("/", FrontendRouteStoreController.create);

// GET /api/routing
router.get("/", FrontendRouteStoreController.getAll);

// //put /api/roles
// router.put("/:id", datatypeController.update);

// //delete /api/roles
// router.delete("/:id", datatypeController.delete);

module.exports = router;
