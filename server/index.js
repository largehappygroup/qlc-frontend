const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/questions", require("./routes/questions.router.js"));
app.use("/exercises", require("./routes/exercises.router.js"));
app.use("/users", require("./routes/users.router.js"));
