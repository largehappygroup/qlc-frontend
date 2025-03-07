const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const QuestionSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["multiple-choice", "coding"],
        required: true,
    },
    topics: [{ type: String, required: true }],
    hints: [{ type: String }],
    correctAnswer: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    otherAnswers: [{ type: String }],
    explanation: {
        type: String,
        required: true,
    },
});

module.exports = Question = mongoose.model("question", QuestionSchema);
