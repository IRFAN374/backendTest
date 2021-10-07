import models from '../model/index.js';


const { User,Order } = models;


export default {
    async createUserDB(data){
        try {
            return await User.create(data);
        } catch (error) {
            throw Error(error)
        }
    },
    async findUserById(id){
        try {
            return await User.findById({ _id: id }, { "__v": 0, "createdAt": 0, "updatedAt":0 });
        } catch (error) {
            throw Error(error)
        }
    },
    async findAllUserDB(){
        try {
            let complexData = await User.aggregate([
                {
                    $lookup: {
                        from: "orders", 
                        localField: "_id",
                        foreignField: "userId",
                        as: "TotalOrders",
                    },
                },
                {
                    $project: {
                        "__v": 0,
                        "createdAt": 0,
                        "updatedAt": 0,
                        "TotalOrders.createdAt":0,
                        "TotalOrders.updatedAt": 0,
                        "TotalOrders.__v": 0,
                        "TotalOrders._id": 0,
                        "TotalOrders.userId": 0,
                        "TotalOrders.date": 0,
                    },
                },
              
            ])
            return complexData;
        } catch (error) {
            throw Error(error)
        }
    },
    async deleteUserById(id){
        try {
            return await User.findByIdAndDelete({ _id: id }, { "__v": 0})
        } catch (error) {
            throw Error(error)
        }
    },
    async updateUserDB(id,data){
        try {
            return await User.findByIdAndUpdate({ _id: id }, data, { "__v": 0});
        } catch (error) {
            throw Error(error)
        }
    },
    async updateTotalDB(id,type){
        try {
            if(type==='inc'){
                return await User.findOneAndUpdate({ _id: id }, { $inc: { 'NumOfOrders': 1 } })
            }else {
                return await User.findOneAndUpdate({ _id: id }, { $dec: { 'NumOfOrders': 1 } })
            }
            
        } catch (error) {
            throw Error(error);
        }
    }
}