var express = require('express');
var router = express.Router();
var md5 = require('md5');
var connection = require('../dbc/db');
router.get('/', function(req, res, next) {
  res.send('The Our Server');
});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  query = "select * from student where is_deleted=false";
  connection.query(query,function(err,results,fields){
    if(err) res.json({ack:'false',msg:'error in query'});
    else res.json({results});
  });
});

// insert api
router.post('/add',function(req,res,next){
  if(req.body.name !=null && req.body.email !=null && req.body.password !=null){
    query = "insert into student(name,email,password)values('"+req.body.name+"','"+req.body.email+"','"+md5(req.body.password)+"')";
    connection.query(query, function (err,results,fields){
if(err) res.json({ack:'false',description:'error in query'});
else res.json({ack:'true', id:results.insertId});
    })

  }else{
    res.json({ack:'missing arguments'});
  }
});
//update api
router.post('/update',function(req,res,next){
  if(req.body.id !=null && req.body.name !=null && req.body.email !=null && req.body.password !=null && req.body.is_deleted !=null)
  {
    query = "update student set name='"+req.body.name+"',email='"+req.body.email+"',password='"+req.body.password+"',is_deleted='"+req.body.is_deleted+"' where id='"+req.body.id+"'";
connection.query(query,function(err,results,fields){
  if(err)res.json({ack:'false',description:err.sqlMessages});
  else{
     if(results.affectedRows>0) res.json({ack:'true',Description:'Database is updated'})
      else res.json({ack:'false',description:'Invalid Id'});
      
  
  }
});
  }
  else{
    res.json({ack:'Missing arguments'});

  }

});
//Delete api
router.post('/delete',function(req,res,next){
if(req.body.id !=null){
query="update student set is_deleted=true where id='"+req.body.id+"'";
connection.query(query,function(err,results,fields){
  if(err) res.json({ack :'false',Description:err.sqlMessages});
  else res.json({results});
})
}else
{
res.json({ack:'false',Description:'Invalid ID'});

}
})

//login api
router.post('/login',function(req,res,next){
  if(req.body.email != null && req.body.password != null){
    query = " select * from student where email='"+req.body.email+"' and password='"+md5(req.body.password)+"'";
    // console.log(query);
  connection.query(query, function (err,results,fields){
if(err) res.json({});
else{
  if(results.length==1 && results[0].email==req.body.email && results[0].password==md5(req.body.password))
  {
    let obj = results[0];
    delete obj.password;
    res.json(obj);
  }else{
    res.json({});
  }

}
    })

  }else{
    res.json({});
  }
});





//-----------------




module.exports = router;
