const Settings = require("../models/settings");
const upload = require("../helpers/upload");
const {
  apiSuccessResponse,
  apiErrorResponse,
} = require("../common/apiResponse");

exports.createSettings = async (req, res) => {
  try {
    const { name, options, displayName, type, value } = req.body;

    let fileUrl = null;

    // Upload the file if it exists
    if (req.file) {
      fileUrl = await upload.uploadFile(req.file.path);
    }
    console.log("gshdushjshdjsahdjhsdjashdj", req.file);
    console.log("Request Body:", req.body);
    // // Check if roleName already exists
    const existingSettings = await Settings.findOne({ where: { name } });
    if (existingSettings) {
      return apiErrorResponse(res, 400, "Settings exists already");
    }
    // Handle options and value appropriately
    // Handle options
    let parsedOptions = {};
    if (options && Object.keys(options).length > 0) {
      try {
        parsedOptions = JSON.parse(JSON.stringify(options));
      } catch (error) {
        console.log("Invalid JSON format for options:", options);
        return apiErrorResponse(res, 400, "Invalid JSON format for options");
      }
    }

    if (!name || !options || !displayName || !type) {
      return apiErrorResponse(res, 400, "Missing required fields");
    }

    // If roleName is unique, create the role
    const settings = await Settings.create({
      name,
      displayName,
      options: JSON.parse(JSON.stringify(parsedOptions)),
      type,
      value: fileUrl || value || value.toString(),
    });
    apiSuccessResponse(res, 201, settings, "Settings created successfully");
  } catch (error) {
    console.error("Error creating settings:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findAll({ order: [["settingId", "DESC"]] });
    apiSuccessResponse(res, 200, settings, "Settings fetched successfully");
  } catch (error) {
    console.error("Error fetching settings:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.updateSettings = async (req, res) => {
  try {
    const settingId = req.params.id;
    const { name, options, displayName, type, value } = req.body;
    console.log("gjugbijhbjk", req.body);
    const setting = await Settings.findByPk(settingId);

    if (!setting) {
      return apiErrorResponse(res, 404, "Setting not found");
    }
    console.log("heduihwdjksdklsjdlksjmd0", setting);

    let fileUrl;
    if (req.file) {
      fileUrl = await upload.uploadFile(req.file.path); // Upload file and get URL
      const originalFileName = req.file.originalname; // Get the original filename
      await setting.update({
        name: name,
        displayName: displayName,
        options: JSON.parse(options),
        type: type,
        value: originalFileName,
      });
    } else {
      console.log("originalFileName", options);
      await setting.update({
        name: name,
        displayName: displayName,
        options: options,
        type: type,
        value: value,
      });
    }

    apiSuccessResponse(res, 200, setting, "Setting updated successfully");
  } catch (error) {
    console.error("Error updating settings:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
exports.deleteSettings = async (req, res) => {
  try {
    const settingId = req.params.id;

    // Check if the setting exists
    const setting = await Settings.findByPk(settingId);
    if (!setting) {
      return apiErrorResponse(res, 404, "setting not found");
    }

    // Delete the setting
    await Settings.destroy({
      where: {
        settingId,
      },
    });

    apiSuccessResponse(res, 200, null, "Setting deleted successfully");
  } catch (error) {
    console.error("Error deleting Setting:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};

exports.getSettingById = async (req, res) => {
  try {
    const settingId = req.params.id;

    // Fetch the setting by ID
    const setting = await Settings.findByPk(settingId);

    // Check if the setting exists
    if (!setting) {
      return apiErrorResponse(res, 404, "Setting not found");
    }

    // Return success response with the setting data
    apiSuccessResponse(res, 200, setting, "Setting fetched successfully");
  } catch (error) {
    console.error("Error fetching setting by ID:", error);
    apiErrorResponse(res, 500, "Internal server error");
  }
};
