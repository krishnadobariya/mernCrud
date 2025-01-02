const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
},
    { Timestamp: true }
)

const user = mongoose.model('user', userSchema);
module.exports = user