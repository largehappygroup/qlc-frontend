const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ExerciseSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    questions: [
        {
            _id: {
                type: ObjectId,
                ref: "Question",
                required: true,
            },
            userAnswer: [
                {
                    type: String,
                },
            ],
            userCorrect: {
                type: Boolean,
            },
            timeSpent: {
                type: Number,
                required: true,
            },
        },
    ],
    status: { type: String, required: true },
    totalTimeSpent: { type: Number, required: true },
    totalCorrect: { type: Number, required: true },
});

module.exports = Exercise = mongoose.model("exercise", ExerciseSchema);
