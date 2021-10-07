import express from 'express';
import controllers from '../controller/index.js';


const router = express.Router();
const { orderController } = controllers;


router.get('/all',orderController.getAllOrder);
router.get('/:userId/all',orderController.getAllOrderOfUser)

router.get('/:orderId/singleorder/:userId',orderController.getOrderById);

router.post('/add/:userId',orderController.createOrder);

router.patch('/:orderId/edit/:userId',orderController.updateOrder);
router.delete('/:orderId/delete/:userId',orderController.deleteOrder);

export default router;