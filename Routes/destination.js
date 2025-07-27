const express = require('express');
const router = express.Router();
const {addDestination, GetDestinations} = require('../Controllers/DestinationControl')
const {upload} = require('../config/upload')

router.post('/addDestination', upload.single('Destinationimage'), addDestination)
router.post('/getDestination', GetDestinations)

module.exports = router;
