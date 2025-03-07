const express = require("express");
const router = express.Router();

const {
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
    downloadUsers,
    getUser,
    getStreak,
} = require("../controllers/users.controller.js");

router.post("/", createUser);
router.put("/:id", editUser);
router.get("/", getAllUsers);
router.get("/:id/streak", getStreak)
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.get("/download", downloadUsers);

module.exports = router;