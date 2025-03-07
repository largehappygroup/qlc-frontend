const Exercise = require("../models/Exercise.js");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

/**
 * Creates a new exercise with AI.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const createExercise = async (req, res) => {
    const { userId } = req.body;
    try {
        if (userId) {
            const date = Date.now();
            //generate and create new exercises here
            const exercise = new Exercise({
                userId,
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

        const exercises = await Exercise.find(filter);

        return res.status(200).json(exercises);
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({
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
