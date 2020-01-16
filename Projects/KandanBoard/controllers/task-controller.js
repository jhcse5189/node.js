var Task = require('../models/task');

// define list() to get all tasks and display
exports.list = (req, res) => {

    //find tasks
    Task.find((err, tasks) => {
        
        console.log('succeed to get all tasks {' + tasks + '}');

        var todoTasks = [],
            inProgressTasks = [],
            doneTasks = [];

        // make task list for each status
        for (var key in tasks) {
            var task = tasks[key];
            if (task.get('status') === 'TO-DO') {
                todoTasks.push(task.get('contents'));
            } else if (task.get('status') === 'In-Progress') {
                inProgressTasks.push(task.get('contents'));
            } else if (task.get('status') === 'Done') {
                doneTasks.push(task.get('contents'));
            } else {
                console.error('Invalid task status: ' + task);
            }
        }

        // rendering to main page with each task list
        res.render('index', {
            title: 'My Kanban Board | Node.js X MongoDB',
            todoTasks: todoTasks,
            inProgressTasks: inProgressTasks,
            doneTasks: doneTasks
        });
    });
};