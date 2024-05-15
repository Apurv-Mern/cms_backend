
const User = require('../models/user');
const { apiSuccessResponse, apiErrorResponse } = require('../common/apiResponse');
const UserRole = require('../models/userRole');

exports.createUser = async (req, res) => {
    try {
        const { name, email, gender, status, age, roleName } = req.body;

           // Create a new user in the database
           const user = await User.create({ name, email, gender, status, age,roleName });

           // Fetch roleId from the request body
           const { roleId } = req.body;

           // Create a new entry in UserRole table
           await UserRole.create({ userId: user.userId, roleId });
   

        apiSuccessResponse(res, 201, user, 'user created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
         apiErrorResponse(res, 500, 'Internal server error');
    }
};




exports.getUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.findAll();

      
        apiSuccessResponse(res, 200, users, 'users fetched successfully');
    } 
    catch (error) {
        console.error('Error fetching users:', error);
        apiErrorResponse(res, 500, 'Internal server error');
    }
};



exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;


        const user = await User.findByPk(userId);

        if (!user) {
            return apiErrorResponse(res, 404, 'User not found');
        }

       apiSuccessResponse(res, 200, user, 'user with fetched successfully');
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        apiErrorResponse(res, 500, 'Internal server error');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, gender, status, age } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
       return apiErrorResponse(res, 404, 'User not found');
    }

     // Update user attributes
     await user.update({
        name,
        email,
        gender,
        status,
        age
    });

   apiSuccessResponse(res, 200, user, 'user updated successfully');
}
catch(error){
console.error('Error updating user:', error);
apiErrorResponse(res, 500, 'Internal server error');
}}


exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return apiErrorResponse(res, 404, 'User not found');
        }
        
        await user.destroy();
        apiSuccessResponse(res, 200, user, 'user deleted successfully');
}catch(error){
    console.error('Error deleting user:', error);
    apiErrorResponse(res, 500, 'Internal server error');
}}