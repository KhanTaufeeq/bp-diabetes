import mongoose, { Schema } from "mongoose";

const sugarSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    fasting: {
        type: Number,
        default: 0
    },
    random: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const Sugar = mongoose.model('Sugar', sugarSchema);

export default Sugar;
