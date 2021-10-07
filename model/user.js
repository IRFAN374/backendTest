import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    NumOfOrders:{
        type: Number,
        default: 0
    },

},{
    timestamps: true
})


export default mongoose.model('User',userSchema);