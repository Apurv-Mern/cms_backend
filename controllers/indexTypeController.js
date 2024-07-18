const IndexType = require("../models/indexType");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");
exports.create = async (req, res) => {
  try {
    const { indexTypeName } = req.body;

    // Check if permission already exists
    const existingIndexType = await IndexType.findOne({
      where: { indexTypeName },
    });
    if (existingIndexType) {
      return apiErrorResponse(res, 400, "indexType name must be unique");
    }

    const indexType = await IndexType.create({
      indexTypeName,
    });

    apiSuccessResponse(res, 201, indexType, "indexType created successfully");
  } catch (error) {
    console.error("Error creating indexType:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.getAll = async (req, res) => {
  try {
    const indexType = await IndexType.findAll();
    apiSuccessResponse(res, 200, indexType, "indexType retrieved successfully");
  } catch (error) {
    console.error("Error retrieving indexType:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
