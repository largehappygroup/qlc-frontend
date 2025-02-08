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
            questionId: {
                type: ObjectId,
                ref: "Question",
                required: true,
            },
            userAnswer: {
                type: String,
            },
            userCorrect: {
                type: Boolean,
            },
            timeSpent: {
                type: Number,
                required: true,
            },
        },
    ],
    totalTimeSpent: { type: Number, required: true },
    totalScore: { type: Number, required: true },
});
