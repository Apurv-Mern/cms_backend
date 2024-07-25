// Function to map field types to Sequelize data types
function mapFieldType(type) {
  switch (type.toUpperCase()) {
    case "INTEGER":
      return "DataTypes.INTEGER";
    case "VARCHAR(255)":
      return "DataTypes.STRING";
    case "TIMESTAMP":
      return "DataTypes.DATE";
    // Add more mappings as needed
    default:
      return "DataTypes.STRING";
  }
}

// Function to create the model file content
function createModelFileContent(tableData) {
  const { tableName, fields } = tableData;

  const fieldsDefinition = fields
    .map((field) => {
      return `
      ${field.fieldName}: {
        type: ${mapFieldType(field.type)},
        allowNull: ${!field.notNull},
        ${field.autoIncrement ? "autoIncrement: true," : ""}
        ${
          field.defaultValue
            ? `defaultValue: Sequelize.literal('${field.defaultValue}'),`
            : ""
        }
        ${field.index === "PRIMARY" ? "primaryKey: true," : ""}
      }`;
    })
    .join(",");

  return `
  const { Sequelize, DataTypes } = require('sequelize');
  const sequelize = require('../database'); // Adjust the path to your database connection
  
  const ${tableName} = sequelize.define('${tableName}', {${fieldsDefinition}
  }, {
    tableName: '${tableName}',
    timestamps: false // Disable timestamps if not required
  });
  
  module.exports = ${tableName};
  `;
}

// Function to create the model file
function createModelFile(tableData) {
  const content = createModelFileContent(tableData);
  const filePath = path.join(__dirname, `../models/${tableData.tableName}.js`);

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Model file created for ${tableData.tableName}`);
}
