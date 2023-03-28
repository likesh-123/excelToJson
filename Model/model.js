const mongoose = require("mongoose");

const validateEmail = function (email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

const userSchema = new mongoose.Schema({
    IRDA_URN: {
        type: String,
        require: [true, 'A tour must have a IRDA URN']
    },
    Payment_Mode: {
        type: String,
        require: [true, 'A tour must have a Payment Mode'],
        enum: {
            values: ["Credit", "Online Payment"],
            message: '{VALUE} is not supported for Payment Mode'
        }
    },
    Insurer_Remark: {
        type: String,
        require: [true, 'A tour must have a Insurer Remark'],
    },
    Enrollment_No: {
        type: Number,
        require: [true, 'A tour must have a Enrollment No']
    },
    onOrAfterDate: {
        type: Date,
        require: [true, 'A tour must have a onOrAfterDate']
    },
    EmailIds: {
        type: String,
        required: [true, "Please enter your email"],
        validate: [validateEmail, "Please enter a valid email"],
        // unique: true,

    },
    Batch_Mode: {
        type: String,
        require: [true, 'A tour must have a Batch Mode'],
        enum: {
            values: ["SINGLE", "BULK"],
            message: '{VALUE} is not supported for Batch Mode'
        }
    },
    Scheduling_Mode: {
        type: String,
        require: [true, 'A tour must have a Scheduling Mode'],
        enum: {
            values: ["SELF", "AUTO"],
            message: '{VALUE} is not supported for Scheduling Mode'
        }
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;