const { Router } = require('express');
const router = Router();

//Controller
const TaskController = require('../controller/TaskController');

//Middleware
const { TaskValidation, TaskFilter } = require('../middleware/TaskValidation');

router.post('/', TaskValidation, TaskController.create);
router.get('/:id', TaskController.show);
router.put('/:id', TaskValidation, TaskController.update);
router.delete('/:id', TaskController.delete);

router.get('/filter/all', TaskFilter, TaskController.all);
router.get('/filter/late', TaskFilter, TaskController.late);
router.get('/filter/today', TaskFilter, TaskController.today);
router.get('/filter/week', TaskFilter, TaskController.week);
router.get('/filter/month', TaskFilter, TaskController.month);
router.get('/filter/year', TaskFilter, TaskController.year);

module.exports = router;