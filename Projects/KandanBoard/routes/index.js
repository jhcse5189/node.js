var express = require('express'),
	task    = require('../controllers/task-controller');

var router = express.Router();

/* GET home page. */
router.get('/', task.list);

/* POST request for home page */
router.post('/createTask', task.create);
router.post('/updateTask', task.update);
router.post('/removeTask', task.remove);

module.exports = router;
