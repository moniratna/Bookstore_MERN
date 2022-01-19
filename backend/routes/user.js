const express = require('express');
const router = express.Router();

const {
    userById,
    purchaseHistory
} = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');

router.get("/secret/:userId",requireSignin ,(req,res)=>{
    res.json({
        user: req.profile
    })
})
router.get('/orders/by/user/:userId', requireSignin,purchaseHistory);
router.param('userId', userById)

module.exports = router;
