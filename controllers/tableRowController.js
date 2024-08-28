const tableRows = require("../models/tableRows");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");
exports.create = async (req, res) => {
  try {
    const { rows, tableName } = req.body;

    const createdFields = [];
    for (const row of rows) {
      const { visibility, inputType, displayName, optionalDetails } = row;
      const tableRow = await tableRows.create({
        tableName,
        visibility,
        inputType,
        displayName,
        optionalDetails,
      });
      createdFields.push(tableRow);
    }

    const response = {
      success: true,
      statusCode: 201,
      data: [
        {
          tableName,
          rows: createdFields.map((row) => ({
            visibility: row.visibility,
            inputType: row.inputType,
            displayName: row.displayName,
            optionalDetails: row.optionalDetails,
            updatedAt: row.updatedAt,
            createdAt: row.createdAt,
          })),
        },
      ],
      message: "table Rows created successfully",
    };
    apiSuccessResponse(
      res,
      201,
      response.data,
      "table rows created successfully"
    );
  } catch (error) {
    console.error("Error creating table row:", error);
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
