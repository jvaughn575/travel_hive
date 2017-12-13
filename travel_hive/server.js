var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;

var router = express.Router();

router.get('/version', function(req, res){
    res.json({ version: "1.0.0"});
});

// Register all routes with api prefix
app.use('/api', router);

app.listen(port);
console.log('Express api listening on port ' + port);
