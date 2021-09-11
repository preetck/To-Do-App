const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/',homeController.home);
router.post('/add-task',homeController.addTask);
router.post('/delete-tasks',homeController.deleteTask);
module.exports = router;