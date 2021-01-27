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

router.get('/filter/all/:macaddress', TaskController.all);
router.get('/filter/late/:macaddress', TaskController.late);
router.get('/filter/today/:macaddress', TaskController.today);
router.get('/filter/week/:macaddress', TaskController.week);
router.get('/filter/month/:macaddress', TaskController.month);
router.get('/filter/year/:macaddress', TaskController.year);

module.exports = router;