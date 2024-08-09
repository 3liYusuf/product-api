const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
  console.log("Connected to DataBase!");
  console.log(`Server is running at http://localhost:${port}`);
});
