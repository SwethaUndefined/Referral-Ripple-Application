const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get("/getUsers",controller.getUsers)
module.exports = router;