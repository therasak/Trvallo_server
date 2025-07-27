const express = require('express');
const router = express.Router();
const {UserManage} = require('../Controllers/UserControl')
const {upload} = require('../config/upload')
const {AuthenticateUser, GetUserData} = require('../Controllers/UserControl')
const {AuthMiddelWare} = require('../middleware/verifyUser')

router.post('/addUser', upload.single("profilePic"), UserManage)
router.post('/login', AuthenticateUser)
router.post('/getUser', AuthMiddelWare, GetUserData)


module.exports = router; 