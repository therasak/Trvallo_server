const express = require('express');
const router = express.Router();
const { addDestination } = require('../Controllers/TestController');

router.post('/addDestination', addDestination)


module.exports = router; 