const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database.js");

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

//app.use("/questions", require("./routes/questions.router.js"));
app.use("/exercises", require("./routes/exercises.router.js"));
//app.use("/users", require("./routes/users.router.js"));

app.get("/", (req, res) => {
    res.send("Ello :D");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
