const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");
const CRUDtable = require("../models/crudTable");
const Database = require("../models/database");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const sequelize = require("../models/connection");

function createControllerFileContent(crudTable, fields) {
  console.log("createControllerFileContent");
  // console.log("crud kaaaa controller ", crudTable);
  // console.log("shdjkshfskjfjs", fields);
  // Example content for the controller file
  // Generate the list of field names from the fields array

  const fieldNames = fields.map((field) => field.fieldName).join(", ");

  return `
  const ${crudTable.modelName} = require('../models/${crudTable.modelName}');

  // Get all records
  exports.getAll = async (req, res) => {
    try {
      const data = await ${crudTable.modelName}.findAll();
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };

  // Create a new record
  exports.create = async (req, res) => {
    try {
      const newData = await ${crudTable.modelName}.create({
        ${fields
          .map((field) => `${field.fieldName}: req.body.${field.fieldName}`)
          .join(",\n          ")}
      });
      res.status(201).json({ success: true, data: newData });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };
  
  // Update a record by ID
  exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await ${crudTable.modelName}.update({
        ${fields
          .map((field) => `${field.fieldName}: req.body.${field.fieldName}`)
          .join(",\n  ")}
      }, {
        where: { id }
      });
  
      if (updated) {
        const updatedData = await ${
          crudTable.modelName
        }.findOne({ where: { id } });
        res.status(200).json({ success: true, data: updatedData });
      } else {
        res.status(404).json({ success: false, message: 'Data not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };
  
  // Delete a record by ID
  exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await ${crudTable.modelName}.destroy({
        where: { id }
      });
  
      if (deleted) {
        res.status(200).json({ success: true, message: 'Data deleted' });
      } else {
        res.status(404).json({ success: false, message: 'Data not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };
`;
}
function createControllerFile(crudTable, fields) {
  console.log(
    "createControllerFilecruddddddddddddddddd",
    crudTable.controllerName
  );
  const content = createControllerFileContent(crudTable, fields);
  const filePath = path.join(__dirname, `./${crudTable.controllerName}.js`);

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Controller file created for ${crudTable.tableName}`);
}
exports.create = async (req, res) => {
  try {
    const { tableName, displayName, urlSlug, modelName, controllerName } =
      req.body;

    if (!(tableName && displayName && urlSlug && modelName && controllerName)) {
      return apiErrorResponse(res, 404, "please fill all fields");
    }

    const data = await CRUDtable.findOne({ where: { tableName } });
    console.log(data);

    if (data) {
      return apiErrorResponse(res, 404, "table name exist already");
    }

    console.log("created");
    const crudTable = await CRUDtable.create({
      tableName,
      displayName,
      urlSlug,
      modelName,
      controllerName,
    });

    // Call the same base URL API
    const externalApiUrl = "http://localhost:4044/api/database/";
    const externalApiResponse = await axios.get(externalApiUrl);
    f;
    // console.log("get ka rewsponse ", externalApiResponse.data);

    externalApiResponse.data.data.forEach((table) => {
      console.log("table", table.tableName);
      if (table.tableName.trim() === tableName.trim()) {
        var fields = table.fields;
        console.log("fields", fields);
        createControllerFile(crudTable, fields);
      }
    });

    // const fieldData = await Database.findAll({
    //   attributes: ["tableName", "fieldName"],
    //   include: [
    //     {
    //       model: CRUDtable,
    //       required: true,

    //       attributes: [
    //         "tableName",
    //         "displayName",
    //         "urlSlug",
    //         "modelName",
    //         "controllerName",
    //       ],
    //     },
    //   ],
    // });
    // console.log("fieldDataaaaaaaaa", fieldData);

    // Pass the API response as a parameter to createControllerFile
    apiSuccessResponse(
      res,
      201,
      { crudTable },
      "crud table created successfully"
    );
  } catch (error) {
    console.error("Error created crud table:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.getById = async (req, res) => {
  try {
    // const tableDataID = req.params.id;
    console.log("innnerrr");

    const id = req.params.id;
    console.log("hellol", id);

    const data = await CRUDtable.findByPk({ tableDataId: id });
    console.log("hellol", data);
    if (!data) {
      return apiErrorResponse(res, 404, "crud table  not found");
    }
    apiSuccessResponse(
      res,
      200,
      data,
      "crud table table retrieved successfully"
    );
  } catch (error) {
    console.error("Error retrieving crud table:", error);

    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.getAll = async (req, res) => {
  try {
    const { tableName } = req.query;

    const whereClause = tableName ? { tableName } : {};

    const databases = await Database.findAll({
      // where: whereClause,
      order: [["tableName", "DESC"]],
    });

    const responseData = databases.reduce((acc, db) => {
      const tableIndex = acc.findIndex(
        (table) => table.tableName === db.tableName
      );

      if (tableIndex === -1) {
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
