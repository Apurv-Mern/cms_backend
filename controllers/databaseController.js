const Database = require("../models/database");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");

exports.create = async (req, res) => {
  try {
    const { tableName, fields } = req.body;

    // Check if the table name already exists
    const existingDatabase = await Database.findOne({ where: { tableName } });
    if (existingDatabase) {
      return apiErrorResponse(res, 400, "Database name must be unique");
    }
    const createdFields = [];
    for (const field of fields) {
      const { fieldName, type, notNull, autoIncrement, index, defaultValue } =
        field;
      const databaseField = await Database.create({
        tableName,
        fieldName,
        type,
        notNull,
        autoIncrement,
        index,
        defaultValue,
      });
      createdFields.push(databaseField);
    }

    const response = {
      success: true,
      statusCode: 201,
      data: [
        {
          tableName,
          databaseId: createdFields[0].databaseId,
          fields: createdFields.map((field) => ({
            fieldName: field.fieldName,
            type: field.type,
            notNull: field.notNull,
            autoIncrement: field.autoIncrement,
            index: field.index,
            defaultValue: field.defaultValue,
            updatedAt: field.updatedAt,
            createdAt: field.createdAt,
          })),
        },
      ],
      message: "Database created successfully",
    };

    return apiSuccessResponse(res, 201, response.data, response.message);
  } catch (error) {
    console.error("Error creating database:", error);
    return apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.getAll = async (req, res) => {
  try {
    // Extract tableName from query parameters
    const { tableName } = req.query;

    // Define where clause for querying the database
    const whereClause = tableName ? { tableName } : {};

    // Query all databases matching the whereClause
    const databases = await Database.findAll({ where: whereClause });

    // Prepare response data
    const responseData = databases.reduce((acc, db) => {
      const tableIndex = acc.findIndex(
        (table) => table.tableName === db.tableName
      );

      if (tableIndex === -1) {
        // If the table does not exist in the response array, add it
        acc.push({
          tableName: db.tableName,
          databaseId: db.databaseId,
          fields: [
            {
              fieldName: db.fieldName,
              type: db.type,
              notNull: db.notNull,
              autoIncrement: db.autoIncrement,
              index: db.index,
              defaultValue: db.defaultValue,
              updatedAt: db.updatedAt,
              createdAt: db.createdAt,
            },
          ],
        });
      } else {
        // If the table exists, add the new field to the existing table's fields array
        acc[tableIndex].fields.push({
          fieldName: db.fieldName,
          type: db.type,
          notNull: db.notNull,
          autoIncrement: db.autoIncrement,
          index: db.index,
          defaultValue: db.defaultValue,
          updatedAt: db.updatedAt,
          createdAt: db.createdAt,
        });
      }

      return acc;
    }, []);

    // Respond with success
    return apiSuccessResponse(
      res,
      200,
      responseData,
      "Databases retrieved successfully"
    );
  } catch (error) {
    console.error("Error retrieving databases:", error);
    return apiErrorResponse(res, 500, "Internal server error");
  }
};
// Update Controller
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tableName,
      fieldName,
      type,
      notNull,
      autoIncrement,
      index,
      defaultValue,
    } = req.body;

    const database = await Database.findByPk(id);
    if (!database) {
      return apiErrorResponse(res, 404, "Database not found");
    }

    await database.update({
      tableName,
      fieldName,
      type,
      notNull,
      autoIncrement,
      index,
      defaultValue,
    });

    apiSuccessResponse(res, 200, database, "Database updated successfully");
  } catch (error) {
    console.error("Error updating database:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
// Delete Controller
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const database = await Database.findByPk(id);
    if (!database) {
      return apiErrorResponse(res, 404, "Database not found");
    }

    await database.destroy();
    apiSuccessResponse(res, 200, {}, "Database deleted successfully");
  } catch (error) {
    console.error("Error deleting database:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
