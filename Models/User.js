const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true, unique: true, trim: true},
        email: {type: String, required: true, unique: true, trim: true},
        userImage: {type: String},
        userName: {type: String},
        gender: {type: String, enum: ['Male', 'Female', 'Other']},
        dateOfBirth: {type: String},
        role: {
            type: String,
            enum: ['User', 'Admin', 'Staff', 'Agent'],
            default: 'User'
        },
        phoneNumber: {type: Number},
        password: {type: String},
        bookings: {type: String},
        whishlist: {type: String},
        createdAt: {type: Date, default: Date.now}
    }

)
 
module.exports = mongoose.model("User", UserSchema)