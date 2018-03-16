const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        fullName: {
            type: String,
            required: false
        },
        username: { 
            type: String, 
            required: true 
        },
        encryptedPassword: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;