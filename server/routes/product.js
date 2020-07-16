var express = require('express');
var router = express.Router();
var connection = require('../dbc/db');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('The Our Product');
});

router.get('/list', function(req, res, next) {
    query="select * from product where is_deleted=false";
    connection.query(query,function(err,results,fields){
        if(err) res.json([]);
        else res.json(results);
    });

  });

  router.post('/add', function(req, res, next) {
    if(req.body.name!=null && req.body.rate!=null && req.body.qty!=null && req.body.type!=null){
    query="insert into product(name,rate,qty,type)values('"+req.body.name+"','"+req.body.rate+"','"+req.body.qty+"','"+req.body.type+"')";
    connection.query(query,function(err,results,fields){
      if(err) res.json({ack:false,description:err.sqlMessages});
      else res.json({ack:true,id:results.insertId}); 
    });
    } else{
      res.json({ack:false, description:'missing arguments'});
    }
  });

  router.post('/update', function(req, res, next) {
    if(req.body.id!=null && req.body.name!=null && req.body.rate!=null && req.body.qty!=null && req.body.type!=null){
      query="update product set name='"+req.body.name+"',rate='"+req.body.rate+"',qty='"+req.body.qty+"',type='"+req.body.type+"' where id='"+req.body.id+"'";
      connection.query(query,function(err,results,fields){
        if(err) res.json({ack:false,description:err.sqlMessages});
        else{
          if(results.affectedRows>0)res.json({ack:true});
          else res.json({ack:false,description:'invalid ID'});
          // console.log(results); used for getting fields of results


        }
      });
      } else{
        res.json({ack:false, description:'missing arguments'});
      }
  });

  router.post('/delete', function(req, res, next) {

    if(req.body.id !=null){
      query="update product set is_deleted=true where id='"+req.body.id+"'";
      connection.query(query,function(err,results,fields){
        if(err) res.json({ack:false,description:err.sqlMessages});
        else{
         // console.log(results);
         if(results.affectedRows>0)res.json({ack:true});
         else res.json({ack:false,description:'Invalid Id'});


        }
      });
      } else{
        res.json({ack:false, description:'missing arguments'});
      }
  });
module.exports = router;
