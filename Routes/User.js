const express = require('express');
const router = express.Router();
const {UserManage} = require('../Controllers/UserControl')
const {upload} = require('../config/upload')
const {AuthenticateUser, GetUserData, userLoged, userLogOut, userUpdate} = require('../Controllers/UserControl')
const {AuthMiddelWare} = require('../middleware/verifyUser');
const {verify} = require('jsonwebtoken');

router.post('/addUser', upload.single("profilePic"), UserManage)
router.post('/login', AuthenticateUser)
router.post('/getUser', AuthMiddelWare, GetUserData)
router.post('/IsLogin', AuthMiddelWare, userLoged)
router.post('/Logout', userLogOut)
router.patch('/UpdateUser', AuthMiddelWare, userUpdate)


module.exports = router; 