import mongoose, { Schema } from "mongoose";

const bpSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    systolic: {
        type: Number,
        default: 0,
        required: true,
    },
    diastolic: {
        type: Number,
        default: 0,
        required: true,
    },
    timing: {
        type: String,
        enum: ['morning', 'afternoon', 'evening'],
        required: true
    }
}, { timestamps: true })

export const BP = mongoose.model('BP', bpSchema);
