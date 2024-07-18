const DataType = require("../models/dataType");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");
exports.create = async (req, res) => {
  try {
    const { dataTypeNames } = req.body;

    // Check if permission already exists
    const existingDatatype = await DataType.findOne({
      where: { dataTypeNames },
    });
    if (existingDatatype) {
      return apiErrorResponse(res, 400, "Datatype name must be unique");
    }

    const datatype = await DataType.create({
      dataTypeNames,
    });

    apiSuccessResponse(res, 201, datatype, "Datatype created successfully");
  } catch (error) {
    console.error("Error creating database:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.getAll = async (req, res) => {
  try {
    const datatype = await DataType.findAll();
    apiSuccessResponse(res, 200, datatype, "DataType retrieved successfully");
  } catch (error) {
    console.error("Error retrieving databases:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
