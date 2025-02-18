const express = require("express");
const router = express.Router();

const {
    createExercise,
    deleteExercise,
    editExercise,
    getAllExercises,
    downloadExercises,
    getExercise,
} = require("../controllers/exercises.controller.js");

router.post("/", createExercise);
router.put("/:id", editExercise);
router.get("/", getAllExercises);
router.get("/:id", getExercise);
router.delete("/:id", deleteExercise);
router.get("/download", downloadExercises);

module.exports = router;