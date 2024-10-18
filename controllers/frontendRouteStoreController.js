const FrontendRouteStore = require("../models/frontendRouteStore");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");
exports.create = async (req, res) => {
  try {
    const { path, elementPath, requiredPermissions } = req.body;

    // // Check if permission already exists
    // const existingElement = await FrontendRouteStore.findOne({
    //   where: { requiredPermissions },
    // });
    // if (existingElement) {
    //   return apiErrorResponse(
    //     res,
    //     400,
    //     "requiredPermissions  name must be unique"
    //   );
    // }

    const frontendRouteStore = await FrontendRouteStore.create({
      path,
      elementPath,
      requiredPermissions,
    });

    apiSuccessResponse(
      res,
      201,
      frontendRouteStore,
      "frontendRouteStore created successfully"
    );
  } catch (error) {
    console.error("Error creating frontendRouteStore:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.getAll = async (req, res) => {
  try {
    const frontendRouteStore = await FrontendRouteStore.findAll();
    apiSuccessResponse(
      res,
      200,
      frontendRouteStore,
      "frontendRouteStore retrieved successfully"
    );
  } catch (error) {
    console.error("Error retrieving frontendRouteStore:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
