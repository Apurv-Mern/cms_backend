const express = require("express");
const router = express.Router();
// const UserController = require("../controllers/userController");
const Model = require("../models/models");

const createModelRoutes = (
  modelName,
  controller,
  middlewareOne,
  middlewareTwo
) => {
  // console.log("model namee", modelName);
  // console.log("ctrllll namee", controller);
  // console.log("middlewareOne", middlewareOne);
  // console.log("middlewareTwo", middlewareTwo);

  const middlewareTwoFn = middlewareTwo
    ? middlewareTwo.single("value")
    : (req, res, next) => next();
  // POST /api/users - Create a new user
  router.post(
    `/${modelName}/`,
    middlewareOne.dynamicAuthorizePermission,
    middlewareTwoFn,
    controller.create
  );

  // GET /api/users - Get all users
  router.get(
    `/${modelName}/`,
    middlewareOne.dynamicAuthorizePermission,
    controller.getAll
  );

  //// PUT /api/users/:id - Update a user by ID
  router.put(
    `/${modelName}/:id`,
    middlewareOne.dynamicAuthorizePermission,
    middlewareTwoFn,
    controller.update
  );
  // // GET /api/users/:id - Get a single user by ID
  router.get(
    `/${modelName}/:id`,
    middlewareOne.dynamicAuthorizePermission,

    controller.getById
  );
  // //DELETE /api/users/:id - Delete a user by ID
  router.delete(
    `/${modelName}/:id`,
    middlewareOne.dynamicAuthorizePermission,

    controller.delete
  );
};
// Dynamically create routes for each model
(async () => {
  try {
    const models = await Model.findAll();
    let modelName;
    let middlewareOneName;
    let middlewareTwoName;
    let middlewareOne;
    let middlewareTwo;

    models.forEach((model) => {
      // console.log("model", model);
      modelName = model.modelName; // Assuming each model has a 'name' property
      middlewareOneName = model.middlewareOneName;
      middlewareTwoName = model.middlewareTwoName;

      // console.log("middlewareTwoName", middlewareTwoName);

      middlewareOne = require(`../middlewares/${middlewareOneName}`);

      middlewareTwo;
      try {
        middlewareTwo = middlewareTwoName
          ? require(`../middlewares/${middlewareTwoName}`)
          : null;
      } catch (err) {
        middlewareTwo = null;
      }

      const controller = require(`../controllers/${modelName}Controller`);
      createModelRoutes(modelName, controller, middlewareOne, middlewareTwo);
    });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
})();

module.exports = router;
