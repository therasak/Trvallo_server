const express = require('express');
const router = express.Router();
const {addDestination, GetDestinations, allDestination, bookDestination, userbookings} = require('../Controllers/DestinationControl')
const {upload} = require('../config/upload')
const {AuthMiddelWare} = require('../middleware/verifyUser')

router.post('/addDestination', upload.single('Destinationimage'), addDestination)
router.post('/getDestination', GetDestinations)
router.post('/allDestination', allDestination)
router.post('/bookdestination', AuthMiddelWare, bookDestination)
router.post('/getbookings', AuthMiddelWare, userbookings)



module.exports = router;
