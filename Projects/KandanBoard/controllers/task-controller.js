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

exports.create = (req, res) => {

    // check same task exists or doesn't, if exists, just skip
    Task.find({contents: req.body.contents}, (err, tasks) => {
        if (err) throw err;
        
        var newTask = true;
        // check same task exists
        if (tasks.length > 0) {
            console.error('Therer are same contents already: ' + req.body.contents);
            newTask = false;
        }

        // if new, save
        if (newTask) {
            new Task({
                contents: req.body.contents,
                author: req.body.author
            }).save();
            console.log('CREATE new task {' + req.body.contents + '}');
        }
    });

    // display all tasks
    res.redirect('/');
    res.end();
};

exports.update = (req, res) => {

    // update tasks with new status
    Task.update({
        contents: req.body.contents
    }, {
        status: req.body.status
    }, (err, numberAffected, raw) => {
        if (err) throw err;
        console.log(`document '%d' updated:`, numberAffected);
        console.log(`raw response from MongoDB: `, raw);
    });

    // display all tasks
    res.redirect('/');
    res.end();
};
