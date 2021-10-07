import models from '../model/index.js';


const { Order } = models;

export default {
    async createOrderDB(data){
        try {
            return await Order.create(data);
        } catch (error) {
            throw Error(error)
        }
    },
    async findAllOrderDB(){
        try {
            return await Order.find({}, { "__v": 0 });
        } catch (error) {
            throw Error(error)
        }
    },
    async findOrderByIdDB(id){
        try {
            return await Order.findById({ _id: id }, { "__v": 0})
        } catch (error) {
            throw Error(error)
        }
    },
    async findOrderUserDB(id){
        try {
            return await Order.find({ userId: id }, { "__v": 0});
        } catch (error) {
            throw Error(error)
        }
    },
    async deleteOrderByIdDB(id){
        try {
            return await Order.findByIdAndDelete({ _id: id }, { "__v": 0})
        } catch (error) {
            throw Error(error)
        }
    },
    async updateOrderDB(id,data){
        try {
            return await Order.findByIdAndUpdate( { _id: id },data, { "__v": 0})
        } catch (error) {
            throw Error(error)
        }
    }
}