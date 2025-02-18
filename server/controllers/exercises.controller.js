const Exercise = require("../models/Exercise.js");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const createExercise = async (req, res) => {
    const { userId } = req.body;
    try {
        if (userId) {
            const date = Date.now();
            //generate and create new exercises here
            const newExercise = new Exercise({
                userId,
            });
            await newExercise.save();

            return res
                .status(200)
                .send({ message: "Exercise successfully created." });
        } else {
            return res.status(400).send({ message: "User ID not found." });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Error when initializing exercise." });
    }
};

const deleteExercise = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            Exercise.findbyIdAndDelete(id);
            return res
                .status(200)
                .send({ message: "Successfully deleted exercise." });
        } else {
            return res.status(400).send({ message: "Missing Exercise ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with deleting exercise." });
    }
};

const editExercise = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const exercise = Exercise.findByIdAndUpdate(id, req.body);
            return res
                .status(200)
                .send({ message: "Successfully updated exercise." });
        } else {
            return res.status(400).send({ message: "Missing Exercise ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with updating exercise." });
    }
};

const getExercise = async (req, res) => {
    const id = req.params?.id;
    try {
        const exercise = await Exercise.findById(id);
        if (!exercise) {
            return res.status(404).send({ message: "Missing Exercise ID." });
        }
        return res.status(200).send({
            message: "Successfully retrieved exercise.",
            data: exercise,
        });
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with retrieving exercise." });
    }
};

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

        const exercises = await Exercise.find();

        return res.status(200).send({
            message: "Successfully retrieved all exercises.",
            data: exercises,
        });
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with retrieving all exercises." });
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
