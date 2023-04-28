const connectToMongoose = require("./db");
const express = require("express");
const cors = require("cors");
connectToMongoose();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/note", require("./routes/Notes"));

app.get("/", (req, res) => {
  res.send("hello deepak");
});

const port = 5000;
app.listen(port, () => {
  console.log(`deepNoteBook backend is listening at http://localhost:${port}`);
});
