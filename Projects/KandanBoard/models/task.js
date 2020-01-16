var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// declare task schema
var taskSchema = new Schema({
    status: {type: String, default: 'TO-DO'},
    contents: String,
    createDate: {type: Date, default: Date.now},
    author: {type: String, default: 'Bammer'} 
});

// exports model for task-controller
module.exports = mongoose.model('Task', taskSchema);
