const fs = require("fs");
const path = require("path");

function generateModelFile(tableData) {
  const { tableName, fields } = tableData;

  // Convert table name to camelCase for the model name
  const modelName = tableName.replace(/(\_\w)/g, (m) => m[1].toUpperCase());

  // Define the fields for the model
  const fieldsDefinitions = fields
    .map((field) => {
      let definition = `${field.fieldName}: {\n`;
      definition += `      type: DataTypes.${field.type.toUpperCase()}`;

      if (field.length && field.type.toUpperCase() === "VARCHAR") {
        definition += `(${field.length})`;
      }

      if (field.notNull) {
        definition += ",\n      allowNull: false";
      }

      if (field.autoIncrement && field.type.toUpperCase() === "INT") {
        definition += ",\n      autoIncrement: true";
      }

      if (field.defaultValue) {
        definition += `,\n      defaultValue: '${field.defaultValue}'`;
      }

      if (field.unsigned) {
        definition += ",\n      unsigned: true";
      }

      definition += "\n    }";
      return definition;
    })
    .join(",\n    ");

  // Add primary key definition if available
  const primaryKeyFields = fields.filter((field) => field.index === "PRIMARY");
  const primaryKeyDefinition =
    primaryKeyFields.length > 0
      ? `\n    primaryKey: {\n      type: DataTypes.INTEGER,\n      autoIncrement: true\n    },`
      : "";

  // Generate the model content
  const modelContent = `
const { DataTypes } = require('sequelize');
const sequelize = require('./../models/connection');

const ${modelName} = sequelize.define('${tableName}', {
    ${fieldsDefinitions}
${primaryKeyDefinition}
  }, {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = ${modelName};
`;

  // Write the model content to a file
  const modelPath = path.join(__dirname, `../models/${modelName}.js`);
  fs.writeFileSync(modelPath, modelContent);

  console.log(`Model file created: ${modelPath}`);
}

module.exports = generateModelFile;
