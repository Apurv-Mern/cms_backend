const Database = require("../models/database");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");

const sequelize = require("../models/connection");
const createModelFile = require("./modelCreation");
// Function to generate CREATE TABLE SQL statement
function generateCreateTableSQL(tableData) {
  const { tableName, fields } = tableData;

  // Remove any leading or trailing spaces from tableName
  const cleanedTableName = tableName.trim();

  let sql = `CREATE TABLE \`${cleanedTableName}\` (`;

  fields.forEach((field, index) => {
    // Remove any leading or trailing spaces from column names
    const cleanedFieldName = field.fieldName.trim();
    sql += `\`${cleanedFieldName}\` ${field.type}`;

    if (field.type === "VARCHAR" && field.length) {
      sql += `(${field.length})`;
    }

    if (field.notNull) sql += " NOT NULL";
    if (field.autoIncrement && field.type === "INT") sql += " AUTO_INCREMENT";
    if (field.defaultValue) sql += ` DEFAULT '${field.defaultValue}'`;
    if (field.index) sql += `, ${field.index} KEY (\`${field.fieldName}\`)`;

    if (index < fields.length - 1) {
      sql += ",";
    }
  });

  // Add PRIMARY KEY if defined in the fields
  const primaryKeyFields = fields.filter((field) => field.index === "PRIMARY");
  if (primaryKeyFields.length > 0) {
    sql += `, PRIMARY KEY (${primaryKeyFields
      .map((field) => `\`${field.fieldName}\``)
      .join(", ")})`;
  }

  sql += ");";

  return sql;
}

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
      const {
        fieldName,
        type,
        notNull,
        autoIncrement,
        index,
        defaultValue,
        length,
        unsigned,
      } = field;
      const databaseField = await Database.create({
        tableName,
        fieldName,
        type,
        notNull,
        autoIncrement,
        index,
        defaultValue,
        length,
        unsigned,
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
            length: field.length,
            unsigned: field.unsigned,
            updatedAt: field.updatedAt,
            createdAt: field.createdAt,
          })),
        },
      ],
      message: "table created successfully",
    };

    // Generate SQL
    const createTableSQL = generateCreateTableSQL(response.data[0]);
    console.log("table in sqlllllllll", createTableSQL);
    // Execute the CREATE TABLE SQL
    await sequelize.query(createTableSQL);
    // // Create the model
    // const model = createModelFile(tableData);

    return apiSuccessResponse(res, 201, response.data, response.message);
  } catch (error) {
    console.error("Error creating table:", error);
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
    const { tableName } = req.params;
    console.log("KJDKSDNFCJ", tableName);

    const databases = await Database.findAll({ where: { tableName } });
    console.log(databases);
    if (!databases) {
      return apiErrorResponse(res, 404, "Database not found");
    }

    // Delete all records
    for (const database of databases) {
      await database.destroy();
    }
    apiSuccessResponse(res, 200, {}, "Database deleted successfully");
  } catch (error) {
    console.error("Error deleting database:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
