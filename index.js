import express from "express";
import bodyParser from "body-parser"; // takes in incoming post requst bodies
import usersRoutes from "./routes/users.js";

const app = express(); //initialise our application
const PORT = 5000;

app.use(bodyParser.json()); //middleware - use JSON data in our whole application
app.use("/api/exercise", usersRoutes);

//listen for incoming requests
app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  return res.send("Exercise Tracker");
});
