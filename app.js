const express = require('express');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

