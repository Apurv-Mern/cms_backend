const Models = require("../models/models");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");

exports.create = async (req, res) => {
  try {
    const { modelName, middlewareOneName, middlewareTwoName } = req.body;

    // Check if permission already exists
    const existingModel = await Models.findOne({ where: { modelName } });
    if (existingModel) {
      return apiErrorResponse(res, 400, "Model name must be unique");
    }

    const models = await Models.create({
      modelName,
      middlewareOneName,
      middlewareTwoName,
    });

    apiSuccessResponse(res, 201, models, "Models created successfully");
  } catch (error) {
    console.error("Error creating Models:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
