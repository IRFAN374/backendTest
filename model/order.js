import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTotal:{
        type: Number,
        default:0
    },
    date: {
        type: Date,
    }
});

export default mongoose.model('Order',orderSchema)