const CrudTable = require("../models/crudTable");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");
exports.create = async (req, res) => {
  try {
    const { tableName, displayName, urlSlug, modelName, controllerName } =
      req.body;

    // Check if permission already exists
    const existingCrudTable = await CrudTable.findOne({
      where: { tableName },
    });
    if (existingCrudTable) {
      return apiErrorResponse(res, 400, "table name must be unique");
    }

    const crudTable = await CrudTable.create({
      tableName,
      displayName,
      urlSlug,
      modelName,
      controllerName,
    });

    apiSuccessResponse(res, 201, crudTable, "crud table created successfully");
  } catch (error) {
    console.error("Error creating crud table:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
// exports.getAll = async (req, res) => {
//   try {
//     const indexType = await IndexType.findAll();
//     apiSuccessResponse(res, 200, indexType, "indexType retrieved successfully");
//   } catch (error) {
//     console.error("Error retrieving indexType:", error);
//     apiErrorResponse(res, 500, "Internal server error");
//   }
// };
