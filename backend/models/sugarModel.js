import mongoose, { Schema } from "mongoose";

const sugarSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fasting: {
        type: Number,
        default: 0,
        min: [0, 'Fasting glucose seems too low'],
        max: [500, 'Fasting glucose seems too high'],
    },
    random: {
        type: Number,
        default: 0,
        min: [0, 'Random glucose seems too low'],
        max: [500, 'Random glucose seems too high'],
    },
}, { timestamps: true })

sugarSchema.index({ user: 1, createdAt: -1 });

const Sugar = mongoose.model('Sugar', sugarSchema);

export default Sugar;
