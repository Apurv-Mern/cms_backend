

const  Role = require('../models/role');

const { apiSuccessResponse, apiErrorResponse } = require('../common/apiResponse');

exports.createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    // Check if roleName already exists
    const existingRole = await Role.findOne({ where: { roleName } });
    if (existingRole) {
      return apiErrorResponse(res, 400, 'Role name must be unique');
    }

    // If roleName is unique, create the role
    const role = await Role.create({ roleName });
    apiSuccessResponse(res, 201, role, 'Role created successfully');
  } catch (error) {
    console.error('Error creating role:', error);
    apiErrorResponse(res, 500, 'Internal server error');
  }
};

exports.getRoles = async (req, res) => {
    try {
        // Fetch all roles from the database
        const roles = await Role.findAll();

        apiSuccessResponse(res, 200, roles, 'Roles fetched successfully');
    } catch (error) {
        console.error('Error fetching roles:', error);
        apiErrorResponse(res, 500, 'Internal server error');
    }
};
