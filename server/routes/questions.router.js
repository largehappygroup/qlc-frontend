const express = require("express");
const router = express.Router();

const {
    createQuestion,
    deleteQuestion,
    editQuestion,
    getAllQuestions,
    downloadQuestions,
    getQuestion,
    checkQuestion
} = require("../controllers/questions.controller.js");

router.post("/", createQuestion);
router.put("/:id", editQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestion);
router.post("/:id/check", checkQuestion);
router.delete("/:id", deleteQuestion);
router.get("/download", downloadQuestions);

module.exports = router;