require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4044;
const cors = require('cors');
app.use(cors());
app.use(cookieParser());



app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,POST', // Allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
  credentials: true
}));

const User=require('./models/user');
const Role=require('./models/role');
const Userlogin=require('./models/userlogin');
// const User_Role=require('./models/userRole');

const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

User.sync({alter: true  });
Role.sync({alter: true  });
Userlogin.sync({alter: true  });

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use user routes
app.use('/api/user', userRoutes); 
app.use('/api/role', roleRoutes);

//login
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
