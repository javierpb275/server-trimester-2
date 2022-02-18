const router = require("express").Router();

router.route("/tasks")
    .get((req, res) => {
        res.json({ message: 'get tasks' });
    })
    .post((req, res) => {
        res.json(req.body);
    });

module.exports = router;