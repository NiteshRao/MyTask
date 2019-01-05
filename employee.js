var express = require('express');
var bodyparser = require('body-parser');
var employeeRouter= express.Router();
employeeRouter.use(bodyparser.json());
const db = require('./db');


//Adding into Employee Table
employeeRouter.post('/Add/', (req ,res , next) => {
var name = req.body.name;
var contactNo = req.body.contactNo;
var deptId = req.body.deptId;
db.any('insert into employee (name, contactno, deptid) values($1, $2, $3);',[name, contactNo, deptId]).then((data)=>{
 res.send({message:'Added Successfully.'});
}).catch(error =>{
    res.send({message:"Adding Unsuccessful.",error:error.message});
});
});

//Retrieving from Employee Table
employeeRouter.get('/Get/', (req, res, next) => {
db.any('select * from employee order by id;').then((data)=>{
 res.send(data);
}).catch(error =>{
    res.send({message:"Retrieving Unsuccessful.",error:error.message});
});
});

//Retrieving by ID from Employee Table
employeeRouter.get('/Get/:Id', (req, res, next) => {
var id=req.params.Id;
db.any('select * from employee where id=$1;',[id]).then((data)=>{
 res.send(data);
}).catch(error =>{
    res.send({message:"Retrieving By Id Unsuccessful.",error:error.message});
});
});

//Updating Employee Table using ID
employeeRouter.put('/Update/:Id', (req ,res , next) => {
    console.log(req.body)
var name = req.body.name;
var contactNo = req.body.contactNo;
var deptId = req.body.deptId;
var id=req.params.Id;
db.any('update employee set name=$1, contactno=$2, deptid=$3 where id=$4;',[name, contactNo, deptId,id]).then((data)=>{
    res.send({message:'Updated Successfully.'});
}).catch(error =>{
    res.send({message:"Updating Unsuccessful.",error:error.message});
});
});

//Deleting by ID from Employee Table
employeeRouter.delete('/Delete/:Id', (req ,res , next) => {
var id=req.params.Id;
db.any('delete from employee where id=$1;',[id]).then((data)=>{
 res.send({message:'Deleted Successfully.'});
}).catch(error =>{
    res.send({message:"Deleting Unsuccessful.",error:error.message});
});
});

module.exports=employeeRouter;