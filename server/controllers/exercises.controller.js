const Exercise = require("../models/Exercise.js");
const Question = require("../models/Question.js");
const mongoose = require("mongoose");
const axios = require("axios");
const { ObjectId } = mongoose.Types;

/**
 * Creates a new exercise with AI.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const createExercise = async (req, res) => {
    const { userId } = req.query;
    try {
        if (userId) {
            const date = new Date();

            const search = await Exercise.findOne({
                date: {
                    $gte: new Date(date.setHours(0, 0, 0, 0)), // Start date
                    $lte: new Date(date.setHours(23, 59, 59, 999)), // End date
                },
            });


            if (search) {
                return res.status(201).json(search);
            }

            const response = await axios.get(
                "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy"
            );
            let questions = [];
            const results = response.data.results;

            for (let i = 0; i < results.length; i++) {
                const result = results[i];

                const question = new Question({
                    _id: new ObjectId(),
                    query: result.question,
                    type: "multiple-choice",
                    topics: ["Programming"],
                    correctAnswer: result.correct_answer,
                    difficulty: result.difficulty,
                    otherAnswers: result.incorrect_answers,
                    explanation: "Pretend an explanation exists here.",
                });

                await question.save();
                questions.push({ _id: question._id, timeSpent: 0 });
            }
            //generate and create new exercises here
            const exercise = new Exercise({
                _id: new ObjectId(),
                date,
                userId,
                topics: ["Programming"],
                questions,
                status: "incomplete",
                totalTimeSpent: 0,
                totalCorrect: 0,
            });
            await exercise.save();

            return res.status(200).json(exercise);
        } else {
            return res.status(400).send({ message: "User ID not found." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Error when initializing exercise.",
            error: err.message,
        });
    }
};

/**
 * Deletes an exercise from MongoDB by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const deleteExercise = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const exercise = await Exercise.findbyIdAndDelete(id);
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }
            return res
                .status(200)
                .send({ message: "Successfully deleted exercise." });
        } else {
            return res.status(400).send({ message: "Missing Exercise ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with deleting exercise.",
            error: err.message,
        });
    }
};

/**
 * Updates exercise by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const editExercise = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const exercise = await Exercise.findByIdAndUpdate(id, req.body);
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }
            return res
                .status(200)
                .send({ message: "Successfully updated exercise." });
        } else {
            return res.status(400).send({ message: "Missing Exercise ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with updating exercise.",
            error: err.message,
        });
    }
};

/**
 * Retrieves an exercise by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getExercise = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const exercise = await Exercise.findById(id);
            if (!exercise) {
                return res.status(404).send({ message: "Exercise not found." });
            }
            return res.status(200).json(exercise);
        } else {
            return res.status(400).send({ message: "Missing Exercise ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving exercise.",
            error: err.message,
        });
    }
};

/**
 * Retrieves all exercises by filter.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAllExercises = async (req, res) => {
    const { userId, date, month, year } = req.query;
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
        } else if (month && year) {
            const startOfMonth = new Date(year, month, 1);
            const today = new Date();
            today.setHours(-1, 59, 59, 999);
            filter.date = { $gte: startOfMonth, $lte: today };
        }

        const exercises = await Exercise.find(filter);

        return res.status(200).json(exercises);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving all exercises.",
            error: err.message,
        });
    }
};

const downloadExercises = async (req, res) => {
    return res.status(200);
};

module.exports = {
    createExercise,
    deleteExercise,
    editExercise,
    getExercise,
    getAllExercises,
    downloadExercises,
};
