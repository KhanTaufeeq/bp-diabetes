import mongoose, { Schema } from "mongoose";

const bpSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,     // user should always be required
    },
    systolic: {
        type: Number,
        required: true,
        min: [50, 'Systolic pressure seems too low'],
        max: [300, 'Systolic pressure seems too high'],
    },
    diastolic: {
        type: Number,
        required: true,
        min: [30, 'Diastolic pressure seems too low'],
        max: [200, 'Diastolic pressure seems too high'],
    },
    pulse: {
        type: Number,
        min: [30, 'Pulse seems too low'],
        max: [200, 'Pulse seems too high'],
    },
    timing: {
        type: String,
        enum: ['morning', 'afternoon', 'evening'],
        required: true
    }
}, { timestamps: true })

bpSchema.index({ user: 1, createdAt: -1 });
// user: 1 = Index user field in ascending order (A→Z, or ObjectId ascending)
// createdAt: -1 = Index createdAt field in descending order (newest first)

export const BP = mongoose.model('BP', bpSchema);
