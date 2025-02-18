const User = require("../models/User.js");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const createUser = async (req, res) => {
    const { userId } = req.body;
    try {
        if (userId) {
            const date = Date.now();

            const newUser = new User({
                userId,
            });
            await newUser.save();

            return res
                .status(200)
                .send({ message: "User successfully created." });
        } else {
            return res.status(400).send({ message: "User ID not found." });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Error when initializing user." });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params?.id;

    try {
        if (id) {
            User.findbyIdAndDelete(id);
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
            .send({ message: "Issue with deleting user." });
    }
};

const editUser = async (req, res) => {
    const id = req.params?.id;
    try {
        if (id) {
            const user = User.findByIdAndUpdate(id, req.body);
            return res
                .status(200)
                .send({ message: "Successfully updated user." });
        } else {
            return res.status(400).send({ message: "Missing User ID." });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with updating user." });
    }
};

const getUser = async (req, res) => {
    const id = req.params?.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: "Missing User ID." });
        }
        return res.status(200).send({
            message: "Successfully retrieved user.",
            data: user,
        });
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with retrieving user." });
    }
};

const getAllUsers = async (req, res) => {
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

        const users = await User.find(filter);

        return res.status(200).send({
            message: "Successfully retrieved all users.",
            data: users,
        });
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send({ message: "Issue with retrieving all users." });
    }
};

const downloadUsers = async (req, res) => {
    return res.status(200);
};

module.exports = {
    createUser,
    deleteUser,
    editUser,
    getUser,
    getAllUsers,
    downloadUsers,
};
