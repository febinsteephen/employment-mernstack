// Task1: initiate app and run server at 3000
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.static(path.join(__dirname, 'dist', 'Frontend')));
// Task2: create mongoDB connection 
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://admin:admin123@cluster0.whspq.mongodb.net/EmployeeDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB Atlas successfully');
})
.catch((err) => {
    console.error('MongoDB Atlas Connection Error:', err.message);
});

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

// Employee Schema and Model
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

const EmployeeData = mongoose.model('employeedata', employeeSchema);

//TODO: get data from db  using api '/api/employeelist'
app.get(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const employees = await EmployeeData.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving employee list', error: error.message });
    }
});

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await EmployeeData.findById(id);
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send(employee);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving single employee', error: error.message });
    }
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post(['/api/employeelist', '/employeelist'], async (req, res) => {
    try {
        const newEmployee = new EmployeeData({
            name: req.body.name,
            location: req.body.location,
            position: req.body.position,
            salary: req.body.salary
        });
        const savedEmployee = await newEmployee.save();
        res.status(200).send(savedEmployee);
    } catch (error) {
        res.status(500).send({ message: 'Error adding new employee', error: error.message });
    }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete(['/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEmployee = await EmployeeData.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting employee', error: error.message });
    }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put(['/api/employeelist', '/employeelist', '/api/employeelist/:id', '/employeelist/:id'], async (req, res) => {
    try {
        const id = req.params.id || req.body._id || req.body.id;
        let query = id ? { _id: id } : { name: req.body.name };

        const updatedEmployee = await EmployeeData.findOneAndUpdate(
            query,
            {
                $set: {
                    name: req.body.name,
                    location: req.body.location,
                    position: req.body.position,
                    salary: req.body.salary
                }
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send(updatedEmployee);
    } catch (error) {
        res.status(500).send({ message: 'Error updating employee data', error: error.message });
    }
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
