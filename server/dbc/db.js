var mysql = require('mysql');
connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'school1'
})
connection.connect((req,res)=>{
    console.log("Database connection is successful!!!!");
});
module.exports=connection;