const Tasks = require('../models/tasks')
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

module.exports.addTask = function (req, res) {
    current_date = new Date(req.body.task_created).toISOString().split('T')[0]
    todays_date = new Date().toISOString().split('T')[0];
    color = ''
    if(current_date < todays_date){
        color = 'rgb(255, 102, 102, 0.5)'
    }
    else if(current_date == todays_date){
        color = "rgb(222, 255, 102, 0.5)"
    }
    else{
        color = "rgb(102, 255, 112, 0.5)"
    }
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

module.exports.deleteTask = function (req, res) {
    // console.log(req.body.ids)
    Tasks.deleteMany({
        _id: { $in: req.body.ids }
    }, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect(req.get('referer'));
    });
};