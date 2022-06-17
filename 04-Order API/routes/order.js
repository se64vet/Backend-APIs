const express = require('express');
const router = express.Router()

import { getAllOrders, placeNewOrder, updateOrder, deleteOrder } from "../controllers/order";

router.use('/')
.get(getAllOrders)
.post(placeNewOrder)

router.use('/:id')
.patch(updateOrder)
.delete(deleteOrder)

export default router