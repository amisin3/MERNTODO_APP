const express = require("express");
const app = express();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("API is Running...");
});

// Init middleware
app.use(express.json({ extended: false }));

// Different Routers
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/todo", require("./routes/api/todo"));

app.listen(PORT, console.log(`Running at PORT no. ${PORT}`));
