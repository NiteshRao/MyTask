var express = require('express');
var bodyparser = require('body-parser');
var deptRouter = express.Router();
deptRouter.use(bodyparser.json());
const db = require('./db');

//Adding into Dept Table
deptRouter.post('/Add/', (req, res, next) => {
    var name = req.body.deptName;
    db.any('select * from fn_adddepartments($1);', [name]).then((data) => {
        res.send({ message: 'Added Successfully.' });
    }).catch(error => {
        res.send({ message: "Adding Unsuccessful.", error: error.message });
    });
});

//Retrieving from Dept Table
deptRouter.get('/Get/', (req, res, next) => {
    db.any('select * from fn_viewdepartments1();').then((data) => {
        res.send(data);
    }).catch(error => {
        res.send({ message: "Retrieving Unsuccessful.", error: error.message });
    });
});

//Retrieving by ID from Dept Table
deptRouter.get('/Get/:Id', (req, res, next) => {
    var id = req.params.Id;
    db.any('select * from fn_viewdepartmentbyID($1);', [id]).then((data) => {
        res.send(data);
    }).catch(error => {
        res.send({ message: "Retrieving By Id Unsuccessful.", error: error.message });
    });
});

//Updating Dept Table using ID
deptRouter.put('/Update/:Id', (req, res, next) => {
    var name = req.body.deptName;
    var id = req.params.Id;
    db.any('select * from fn_updatedepartments($1,$2)', [id, name]).then((data) => {
        res.send({ message: 'Updated Successfully.' });
    }).catch(error => {
        res.send({ message: "Updating Unsuccessful.", error: error.message });
    });
});

//Deleting single record from Dept Table
deptRouter.delete('/Delete/:Id', (req, res, next) => {
    var id = req.params.Id;
    db.any('select * from fn_deleteDepartmentByID($1);', [id]).then((data) => {
        res.send({ message: 'Deleted Successfully.' });
    }).catch(error => {
        res.send({ message: "Deleting Unsuccessful.", error: error.message });
    });
});

module.exports = deptRouter;