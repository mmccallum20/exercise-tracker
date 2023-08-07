import express from "express";
const router = express.Router();

let users = [];

// Get an array of all users by getting api/exercise/users
// with the same info as when creating a user.
router.get("/users", (req, res) => {
  res.send(users);
});

//Get an individual record
router.get("/users/:id", (req, res) => {
  let id = req.params.id;

  const foundUser = users.find((user) => user.id == id);

  res.send(foundUser);
});

// Create a user by posting form data username to /api/exercise/new-user and returned will be
//an object with username and _id.

router.post("/new-user", (req, res) => {
  const user = req.body;
  const id = users.length + 1;
  const newUser = { ...user, id: id };

  users.push(newUser);

  res.send(
    `New user object: { username: ${newUser.username}, id: ${newUser.id} }`
  );
});

//Delete a user
router.delete("/users/:id", (req, res) => {
  let id = req.params.id;

  users = users.filter((user) => user.id != id);

  res.send(users);
});

/* Add an exercise to any user by posting form data:
 userId(_id), description, duration, and optionally date to /api/exercise/add.
If no date supplied it will use current date. 
Returned will be the user object with also with the exercise fields added.*/

router.patch("/add", (req, res) => {
  const id = req.body.id;
  const exercise = req.body.exercise;
  const exercise2 = req.body.exercise2;
  const duration = req.body.duration;
  const date = req.body.date;

  const user = users.find((user) => user.id == id); // filter function to find the user we want to update

  if (!user) res.send("Error: user not found");
  if (!id) res.send("Error: please input id");
  if (!exercise) res.send("Error: please input exercise");
  if (!duration) res.send("Error: please input duration");
  if (!date) {
    user.date = "Aug 7, 2023";
  }

  if (req.body.id) {
    user.id = id;
  }
  if (req.body.exercise) {
    user.exercise = exercise;
  }
  if (req.body.exercise2) {
    user.exercise = exercise2;
  }
  if (req.body.duration) {
    user.duration = duration;
  }
  if (req.body.date) {
    user.date = date;
  }

  res.send(user);
});

// Retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id).
// Return will be the user object with added array log and count (total exercise count).
router.get("/log/:id", (req, res) => {
  let id = req.params.id;
  const chosenUser = users.find((user) => user.id == id); // filter function to find the user we want to update

  // let id = req.params.id;

  // const foundUser = users.find((user) => user.id == id);

  console.log(chosenUser);

  let log = [];
  let exercise = chosenUser.exercise;
  let exercise2 = chosenUser.exercise2;

  if (exercise && exercise2) {
    log.push(exercise);
    log.push(exercise2);
  } else if (exercise) {
    log.push(exercise);
  } else {
    log.push(exercise2);
  }

  const count = log.length;

  const userArray = { ...chosenUser, log: log, count: count };
  res.send(userArray);
});

export default router;
