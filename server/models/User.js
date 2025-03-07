const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    vuNetId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "faculty", "ta", "student"]
    },
});

module.exports = User = mongoose.model("user", UserSchema);
