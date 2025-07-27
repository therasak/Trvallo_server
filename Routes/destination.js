const express = require('express');
const router = express.Router();
const {addDestination, GetDestinations, allDestination} = require('../Controllers/DestinationControl')
const {upload} = require('../config/upload')

router.post('/addDestination', upload.single('Destinationimage'), addDestination)
router.post('/getDestination', GetDestinations)
router.post('/allDestination', allDestination)


module.exports = router;
