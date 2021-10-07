import httpStatus from "http-status";
import repository from "../repository/index.js";

const { orderRepository,userRepository } = repository;

export default{
    async createOrder(req,res){
        try {
            let userId = req.params.userId;
            let data = {
                ...req.body,
                userId,
                date: new Date().toLocaleString()
            }
           
            let result = await orderRepository.createOrderDB(data);
            
            let updatedTotal = await userRepository.updateTotalDB(userId, 'inc');
            return res.status(httpStatus.CREATED).json({
                success: true,
                message: 'Successfully Order Created:',
                data: result,
                updatedTotal
            })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal Server Error:',
                error
            })
        }
    },
    async updateOrder(req,res){
        try {
            const {userId, orderId} = req.params;
            let isUserExist = await userRepository.findUserById(userId);
            if (!isUserExist) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: `User Does Not exist with id: ${userId}`
                })
            }
            let data = await orderRepository.updateOrderDB(orderId,req.body);
            return res.status(httpStatus.OK).json({
                success: true,
                message: `Successfully updated order of user:${userId}`,
                data
            })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal Server Error:',
                error
            })
        }
    },
    async deleteOrder(req,res){
        try {
            const {orderId,userId} = req.params;
            let isUserExist = await userRepository.findUserById(userId);
            if (!isUserExist) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: `User Does Not exist with id: ${userId}`
                })
            }
            let data = await orderRepository.deleteOrderByIdDB(orderId);
            return res.status(httpStatus.OK).json({
                success: true,
                message: `SuccessFully deleted order of Sppecific user:${userId}`,
                data
            })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal Server Error:',
                error
            })
        }
    },
    async getOrderById(req,res){
        try {
            const {orderId,userId} = req.params;
            let isUserExist = await userRepository.findUserById(userId);
            if (!isUserExist) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: `User Does Not exist with id: ${userId}`
                })
            }
            let data = await orderRepository.findOrderByIdDB(orderId);
            return res.status(httpStatus.OK).json({
                success: true,
                message: `SuccessFully get specific order of userID:${userId}`,
                data
            })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal Server Error:',
                error
            })
        }
    },
    async getAllOrder(req,res){
        try {
            let result = await orderRepository.findAllOrderDB();
            return res.status(httpStatus.CREATED).json({
                success: true,
                message: 'Successfully All order fetched:',
                data: result,
                total: result.length
            })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal Server Error:',
                error
            })
        }
    },
    async getAllOrderOfUser(req,res){
        try {
            let userId = req.params.userId;
            let isUserExist = await userRepository.findUserById(userId);
            if(!isUserExist){
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: `User Does Not exist with id: ${userId}`
                })
            }
            let data = await orderRepository.findOrderUserDB(userId);
            return res.status(httpStatus.OK).json({
                success: true,
                message: `Successfully get All order Data of user:${userId}`,
                data,
                total: data.length
            })
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal Server Error:',
                error
            })
        }
    }
}