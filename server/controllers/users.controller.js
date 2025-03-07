const User = require("../models/User.js");
const Exercise = require("../models/Exercise.js");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

/**
 * Creates a new user (registration)
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const createUser = async (req, res) => {
    const { firstName, lastName, vuNetId, email } = req.body;
    try {
        if (firstName && lastName && vuNetId && email) {
            const user = new User({
                firstName,
                lastName,
                vuNetId,
                email,
                role,
            });

            await user.save();

            return res.status(200).json(user);
        } else {
            return res
                .status(400)
                .send({ message: "Missing at least one required field." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Error when initializing user.",
            error: err.message,
        });
    }
};

/**
 * Deletes a user by ID in MongoDB
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details
 */
const deleteUser = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            const user = await User.findbyIdAndDelete(id);
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            return res
                .status(200)
                .send({ message: "Successfully deleted user." });
        } else {
            return res.status(400).send({ message: "Missing User ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with deleting user.", error: err.message });
    }
};

const editUser = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const user = await User.findByIdAndUpdate(id, req.body);
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            return res.status(200).json(user);
        } else {
            return res.status(400).send({ message: "Missing User ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "Issue with updating user." });
    }
};

/**
 * Retrieves a user by ID.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getUser = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            return res.status(200).json(user);
        } else {
            return res.status(400).send({ message: "Missing User ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving user.",
            error: err.message,
        });
    }
};

/**
 * Retrieves all users by filter.
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const getAllUsers = async (req, res) => {
    const { role } = req.query;
    try {
        let filter = {};

        if (role) {
            filter.role = new RegExp(role, "i");
        }

        const users = await User.find(filter);

        return res.status(200).send(users);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: "Issue with retrieving all users.",
            error: err.message,
        });
    }
};

/**
 * Allows a csv of all users to be downloaded
 * @param {*} req - request details
 * @param {*} res - response details
 * @returns - response details (with status)
 */
const downloadUsers = async (req, res) => {
    return res.status(200);
};

/**
 * Gets the streak amount for the user
 *
 */
const getStreak = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const exercises = await Exercise.find({ userId: id });
            let sortExercises = [...exercises];
            sortExercises.sort((a, b) => b.date - a.date);

            let streak = 0;

            const today = new Date();

            for (let i = 0; i < sortExercises.length; i++) {
                const date = sortExercises[i].date;
                if (
                    streak === 0 &&
                    date.toDateString() === today.toDateString()
                ) {
                    streak++;
                } else if (
                    streak > 0 &&
                    isOneDayApart(date, sortExercises[i - 1].date)
                ) {
                    streak++;
                } else {
                    break;
                }
            }
            return res.status(200).json(`${streak} day${streak != 1 ? "s" : ""}`);
        } else {
            return res.status(400).send({ message: "Missing User ID" });
        }
    } catch (err) {}
};

const isOneDayApart = (date1, date2) => {
    const dayInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds

    // Set time to midnight for both dates to ignore the time part
    const date1Midnight = new Date(date1.setHours(0, 0, 0, 0));
    const date2Midnight = new Date(date2.setHours(0, 0, 0, 0));

    return date1Midnight - date2Midnight === dayInMilliseconds;
};

module.exports = {
    createUser,
    deleteUser,
    editUser,
    getUser,
    getAllUsers,
    downloadUsers,
    getStreak
};
