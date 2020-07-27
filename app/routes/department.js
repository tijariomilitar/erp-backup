const router = require("express").Router();

const departmentController = require('../controller/department');

router.get('/index', departmentController.index);
router.get('/manage', departmentController.manage);

// router.get('/', departmentController.list);

module.exports = router;