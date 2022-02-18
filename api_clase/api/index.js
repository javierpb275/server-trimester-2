const router = require('express').Router();
const controller = require('./controller');

router.route('/personas')
    .get(controller.todos)
    .post(controller.crear);

router.route('/personas/:id')
    .get(controller.leer)
    .put(controller.actualizar);

module.exports = router;