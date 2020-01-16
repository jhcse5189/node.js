var express    = require('express'),
	controller = require('../controllers/index');

var router = express.Router();

/* GET home page. */
router.get('/', controller.index);
//router.post('/createTask', task.create);
//router.post('/updateTask', task.update);
//router.post('/removeTask', task.remove);

module.exports = router;
