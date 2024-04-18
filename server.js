const express = require("express");
const mongoose = require("mongoose");

// create the express app
const app = express();

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log(error);
  });

//Routes
const showRouter = require("./routes/show"); //* import function equivalent to react

app.use("/shows", showRouter);

// Start the server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
