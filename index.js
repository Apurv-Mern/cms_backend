const express = require('express');
const app = express();
const PORT = process.env.PORT || 4044;
const cors = require('cors');
app.use(cors());


app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,POST', // Allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
}));

const User=require('./models/user');
const Role=require('./models/role');
// const User_Role=require('./models/userRole');

const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

User.sync({alter: true  });
Role.sync({alter: true  });


// Define associations
// User.hasOne(Role, { foreignKey: 'roleId' }); // One-to-one relationship between User and Role
// Role.belongsTo(User, { foreignKey: 'roleId' }); // One-to-one relationship between Role and User



// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Use user routes
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
