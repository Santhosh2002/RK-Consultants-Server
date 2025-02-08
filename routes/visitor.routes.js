const express = require('express')
const { addVisitor , getVisitors} = require('../controller/visitor.controller')
const adminMiddleware = require('../middleware/admin.middleware')

const router = express.Router()

router.get("/",addVisitor);
router.get("/visitors",getVisitors);


module.exports = router; 
