// const express = require('express')
// const bodyParser = require('body-parser')
// const mysql = require("mysql")
// const server = express()
// server.use(bodyParser.json());



// const db = mysql.createConnection({

//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "dbemployeedata",
// });


// //To check we are connected to database
// db.connect(function (error) {
//     if (error) {
//       console.log("Error Connecting to DB");
//     } else {
//       console.log("successfully Connected to DB");
//     }
//   });


//   //Establish the Port
 
//   server.listen(8080,function check(error) {
//     if (error)
//     {
//     console.log("Error!!!!");
//     }
 
//     else
//     {
//         console.log("Started...8080");
 
//     }
// });


// server.post("/api/employee/add", (req, res) => {
//     let details = {
//       employeename: req.body.employeename,
//     //   course: req.body.course,
//     //   fee: req.body.fee,
//     };
//     let sql = "INSERT INTO emplyee SET ?";
//     db.query(sql, details, (error) => {
//       if (error) {
//         res.send({ status: false, message: "Employee created Failed" });
//       } else {
//         res.send({ status: true, message: "Employee created successfully" });
//       }
//     });
//   });
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app=express();
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbemployeedata',
    port:3306,

});

db.connect(err =>{
    if(err){console.log('error')}
    console.log('Database connected')
})

app.get('/employee',(req,res)=>{
    //  console.log('get all users');
    let qrr = `SELECT * FROM employee`;
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'error');
        }
        if(results.length>0){
            res.send({
                message:"All employee data",
                data: results
            });
        }
    });
});

app.get('/employee/:id',(req,res)=>{
    let qrrId = req.params.id;
    let qrr=`SELECT * FROM employee WHERE id=${qrrId}`;
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'error');
        }
        if(results.length>0){
            res.send({
                message:"All employee data",
                data: results
            });
        }else{
            res.send({
              message:"Data not found!!"
            });
        }    
    });
});

app.post('/employee',(req,res)=>{
    let employeename = req.body.name;
    let qrr= `INSERT INTO employee( employeename) VALUES ('${employeename}')`
    db.query(qrr,(err,results)=>{
      if(err){
        console.log(err,'error');
      }
      res.send({
        message:"Employee Added",
      });     
  });
});

app.delete('/employee/:id',(req,res)=>{
  let qrrId = req.params.id;
  let qrr=`DELETE FROM employee WHERE id=${qrrId}`;
  db.query(qrr,(err,results)=>{
      if(err){
        console.log(err,'error');
      }
      res.send({
        message:"Employee Deleted",
        // data: results
     });
  });
});

app.put('/employee/:id',(req,res)=>{
  let qrrId =req.params.id;
  let name = req.body.name;

  let qrr =`UPDATE employee SET employeename= '${name}' WHERE id='${qrrId}'`;
  db.query(qrr,(err,results)=>{
    if(err){
      console.log(err,'error');
    }
    res.send({
      message:"Employee Updated",
  });
  })

});

app.delete('/employee',(req,res)=>{
  let qrr = `DELETE FROM employee`;
  db.query(qrr,(err,results)=>{
      if(err){
        console.log(err,'error');
      }
      res.send({
        message:"All Employee Deleted",
      });
  });
});

app.get('/search-employee',function(req,res){
  con.connect(function(error){
    if(error){
      console.log('error');
    }
    var sql ="select * from employee";

    con.query(sql,function(error,result){
      if(error){
        console.log('error')
      }
      res.render(__dirname+"/search-employee", {employee:result})
    });
  });
});



app.listen(3000,()=>{
  console.log("server is connected");
})