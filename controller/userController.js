import httpStatus from "http-status";
import repository from '../repository/index.js';

const { userRepository } = repository;

export default {
   async createUser(req,res){
       try {
           let result = await userRepository.createUserDB(req.body);
           return res.status(httpStatus.CREATED).json({
               success: true,
               message: 'Successfully user Created:',
               data: result
           })
       } catch (error) {
           return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
               success: false,
               message: 'Internal Server Error:',
               error
           })
       }
   },
   async updateUser(req,res){
       try {
           const id = req.params.id;
           let isUserExist = await userRepository.findUserById(id);
           if(!isUserExist){
               return res.status(httpStatus.BAD_REQUEST).json({
                   success: false,
                   message: `No user Exists with id: ${id}`,
               })
           }
           let result = await userRepository.updateUserDB(id,req.body);
           return res.status(httpStatus.OK).json({
               success: true,
               message: 'Successfully updated user info:',
               data: result
           })
       } catch (error) {
           return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
               success: false,
               message: 'Internal Server Error:',
               error
           })
       }
   },
   async deleteUser(req,res){
       try {
           const id = req.params.id;
           let isUserExist = await userRepository.findUserById(id);
           if (!isUserExist) {
               return res.status(httpStatus.BAD_REQUEST).json({
                   success: false,
                   message: `No user Exists with id: ${id}`,
               })
           }
           let result = await userRepository.deleteUserById(id);
           return res.status(httpStatus.OK).json({
               success: true,
               message: 'Successfully deleted user info:',
               data: result
           })
       } catch (error) {
           return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
               success: false,
               message: 'Internal Server Error:',
               error
           })
       }
   },
   async getUserById(req,res){
       try {
           const id = req.params.id;
           let result = await userRepository.findUserById(id);
           if(!result){
               return res.status(httpStatus.BAD_REQUEST).json({
                   success: false,
                   message: `No user Exists with id: ${id}`,
               })
           }
           return res.status(httpStatus.OK).json({
               success: true,
               message: 'Successfully get User:',
               data: result
           })
           
       } catch (error) {
           return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
               success: false,
               message: 'Internal Server Error:',
               error
           })
       }
   },
   async getAllUser(req,res){
       try {
           let result = await userRepository.findAllUserDB();
           return res.status(httpStatus.OK).json({
               success: true,
               message: 'Successfully get All User:',
               data: result
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