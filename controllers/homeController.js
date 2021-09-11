const Tasks = require('../models/tasks')
module.exports.home = function(req,res){
    Tasks.find({}, function (err, tasks) {
        if (err) {
            console.log("Error in fetching contacts")
            return;
        }
        return res.render('home', {
            title: 'My Contacts',
            tasks_list: tasks,
        });
    })
}

module.exports.addTask = function(req,res){
    // console.log(new Date(req.body.task_created).toISOString().split('T')[0])
    Tasks.create({        
        task_name: req.body.task_name,
        task_created : new Date(req.body.task_created).toISOString().split('T')[0],
        category: req.body.category,
    },function(err,newTask){
        if(err){
            console.log(err)
        }
        else{
            // console.log("*****", newTask);
            return res.redirect("back");
        }
    })
};
module.exports.deleteTask = function(req,res){
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