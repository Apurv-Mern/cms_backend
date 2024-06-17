const Role = require("../models/role");

const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    // const role = await Role.findByPk(req.roleId);
    // console.log(role);
    // if (!role || !role.permissions.includes(requiredPermission)) {
    //   return res.status(403).send("Role Access denied.");
    // }

    next();
  };
};

module.exports = authorize;
