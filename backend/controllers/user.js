const User = require('../models/userModel');
const { Order } = require('../models/order');

exports.userById = (req, res, next, id) =>{
    User.findById(id).exec((err, user)=>{
        if(err || !user) {
            return res.status(400).json({
                error:'user not found'
            });
        }
        req.profile = user;
        next();
    })
}
exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};