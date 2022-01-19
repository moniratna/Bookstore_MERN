const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const {
    create,
    listOrders,
    getStatusValues,
    orderById,
    updateOrderStatus
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
    "/order/create/:userId",
    
    create
);

router.get("/order/list/:userId",listOrders);
router.get(
    "/order/status-values/:userId",
    
    getStatusValues
);
router.put(
    "/order/:orderId/status/:userId",

    updateOrderStatus
);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
