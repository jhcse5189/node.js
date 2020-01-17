var mongoose = require('mongoose'),
    moment   = require('moment'),
    Schema   = mongoose.Schema;

require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
var date = moment().format('YYYY-MM-DD HH:mm:ss');

// declare task schema
var taskSchema = new Schema({
    status: {type: String, default: 'TO-DO'},
    contents: String,
    createDate: {type: Date, default: date},
    author: {type: String, default: 'Bammer'} 
});

// exports model for task-controller
module.exports = mongoose.model('Task', taskSchema);
