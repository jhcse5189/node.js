var express    = require('express'),
	controller = require('../controllers/index');

var router = express.Router();

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
