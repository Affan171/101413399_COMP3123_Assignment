const mongoose = require('mongoose');

// Define a schema
const employeeSchema = new mongoose.Schema({
    "first_name":{
        type: String,
        required: true,
        trim: true,
    },
    "last_name":{
        type: String,
        required: true,
        trim: true,
    },
    "email":{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    "position":{
        type: String,
        required: true,
        trim: true,
    },
    "salary":{
        type: Number,
        required: true,
    },
    "date_of_joining":{
        type: Date,
        default: Date.now,
    },
    "department":{
        type: String,
        required: true,
        trim: true,
    },
    "created_at":{
        type: Date,
        default: Date.now,
    },
    "updated_at":{
        type: Date,
        default: Date.now,
    },
});

const employeeModel = mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;