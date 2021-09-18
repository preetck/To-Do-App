// Importing Task models from MongoDB Collection.
const Tasks = require('../models/tasks')
// Code to enlist all of the tasks from the mongodb collection named Tasks.
module.exports.home = function (req, res) {
    Tasks.find({}, function (err, tasks) {
        if (err) {
            console.log("Error in fetching contacts")
            return;
        }
        return res.render('home', {
            title: 'Todo App',
            tasks_list: tasks,
        });
    })
}

// Code to create task in the mongodb collection named Tasks.
module.exports.addTask = function (req, res) {
    current_date = new Date(req.body.task_created).toISOString().split('T')[0]
    todays_date = new Date().toISOString().split('T')[0];
    color = ''
    // Logic for setting background color in styling the div element in front end. 
    if(current_date < todays_date){
        //Background - color : RED
        color = 'rgb(255, 102, 102, 0.5)'
    }
    else if(current_date == todays_date){
        //Background - color : Yellow
        color = "rgb(222, 255, 102, 0.5)"
    }
    else{
        //Background - color : Green
        color = "rgb(102, 255, 112, 0.5)"
    }
    //Code to actually create entry in database.
    Tasks.create({
        task_name: req.body.task_name,
        task_created: new Date(req.body.task_created).toISOString().split('T')[0],
        color:color,
        category: req.body.category,        
    }, function (err, newTask) {
        if (err) {
            console.log(err)
        }
        else {
            return res.redirect("back");
        }
    })
};

// Code to delete task(s) using the id of the tasks.
module.exports.deleteTask = function (req, res) {
    Tasks.deleteMany({
        _id: { $in: req.body.ids }
    }, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect(req.get('referer'));
    });
};