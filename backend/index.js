const connectToMongoose = require("./db");
const express = require("express");
connectToMongoose();
const app = express();
app.use(express.json())
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/note", require("./routes/Notes"));

app.get("/", (req, res) => {
  res.send("hello deepak");
});

const port = 5000;
app.listen(port, () => {
  console.log(`The app is listening to port ${port}`);
});
