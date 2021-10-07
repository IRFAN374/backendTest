import express from 'express';
import controller from '../controller/index.js';

const router = express.Router();
const {userController} = controller;

router.get('/all',userController.getAllUser);
router.get('/:id/singleuser',userController.getUserById);

router.post('/add',userController.createUser);
router.patch('/:id/edit',userController.updateUser);
router.delete('/:id/delete',userController.deleteUser);

export default router;