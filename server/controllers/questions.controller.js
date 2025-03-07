const Question = require("../models/Question.js");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

/**
 * Creates a new question with AI.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const createQuestion = async (req, res) => {
    const { userId } = req.body;
    try {
        if (userId) {
            const date = Date.now();
            //generate and create new questions here
            const question = new Question({
                userId,
            });
            await question.save();

            return res.status(200).json(question);
        } else {
            return res.status(400).send({ message: "User ID not found." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Error when initializing question.",
            error: err.message,
        });
    }
};

/**
 * Deletes an question from MongoDB by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const deleteQuestion = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const question = await Question.findbyIdAndDelete(id);
            if (!question) {
                return res.status(404).send({ message: "Question not found." });
            }
            return res
                .status(200)
                .send({ message: "Successfully deleted question." });
        } else {
            return res.status(400).send({ message: "Missing Question ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with deleting question.",
            error: err.message,
        });
    }
};

/**
 * Updates question by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const editQuestion = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const question = await Question.findByIdAndUpdate(id, req.body);
            if (!question) {
                return res.status(404).send({ message: "Question not found." });
            }
            return res
                .status(200)
                .send({ message: "Successfully updated question." });
        } else {
            return res.status(400).send({ message: "Missing Question ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with updating question.",
            error: err.message,
        });
    }
};

/**
 * Retrieves an question by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getQuestion = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const question = await Question.findById(id);
            if (!question) {
                return res.status(404).send({ message: "Question not found." });
            }

            let availableAnswers = [
                question.correctAnswer,
                ...question.otherAnswers,
            ]
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);

            const removeElements = {
                _id: question._id.toString(), // Convert ObjectId to string
                query: question.query,
                type: question.type,
                topics: question.topics,
                difficulty: question.difficulty,
                explanation: question.explanation,
                availableAnswers: availableAnswers,
            };

            return res.status(200).json(removeElements);
        } else {
            return res.status(400).send({ message: "Missing Question ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving question.",
            error: err.message,
        });
    }
};

/**
 * Retrieves an question by ID and checks if answer is correct
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const checkQuestion = async (req, res) => {
    const id = req.params?.id;
    const { userAnswer } = req.body;
    try {
        if (id) {
            const question = await Question.findById(id);
            if (!question) {
                return res.status(404).send({ message: "Question not found." });
            }

            return res.status(200).json(userAnswer === question.correctAnswer);
        } else {
            return res.status(400).send({ message: "Missing Question ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving question.",
            error: err.message,
        });
    }
};

/**
 * Retrieves all questions by filter.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAllQuestions = async (req, res) => {
    const { userId, date } = req.body;
    try {
        let filter = {};

        if (userId) {
            filter.userId = userId;
        }

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const questions = await Question.find();

        return res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving all questions.",
            error: err.message,
        });
    }
};

const downloadQuestions = async (req, res) => {
    return res.status(200);
};

module.exports = {
    createQuestion,
    deleteQuestion,
    editQuestion,
    getQuestion,
    getAllQuestions,
    downloadQuestions,
    checkQuestion,
};
