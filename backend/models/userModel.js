import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 50,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        maxlength : 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
