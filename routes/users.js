var express = require('express');
var router = express.Router();

/*
get use req.query.name
post use req.body.name
path use req.params.name
 */

/* GET users listing. */
router.get('/*', function(req, res, next) {
  console.log(req.url + " - " + "[params=" + req.params + "]" + req.method + " - " + req.user + " add some messages");
  next();
});

router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express Users' });
});

router.get('/table', function(req, res, next) {
  res.render('table_temple', { title: 'Express Users' });
});

router.get('/table/data', function(req, res, next) {
  var data = {};
  data["total"] = 10;
  var rows = [];
  var limit = Number(req.query.limit);
  var offset = Number(req.query.offset);
  for(index = offset; index < offset+limit; index++) {
    rows.push({"id":index, "name":"Item "+ index, "price":"$"+index});
  }
  data["rows"] = rows;
  res.json(data);
});

router.get('/menu',function(req, res, next) {
  res.render('menu', { title: 'Express Users' });
});

router.get('/:id/get', function(req, res, next) {
  console.log(req.params.id);
  res.send('respond with a resource get');
});

router.get('/set', function(req, res, next) {

  res.send('respond with a resource set');
});

router.post('/:id/edit', function(req, res, next) {

  res.send('respond with a resource edit');
});

router.get('/:id/delete', function(req, res, next) {

  res.send('respond with a resource delete');
});

module.exports = router;
