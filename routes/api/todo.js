const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Todos = require("../../models/Todo");
const Users = require("../../models/User");

// @route api/todo
// @desc Get all the todos of the user
// @access Private
router.get("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      msg: "No Token is present",
    });
  }

  try {
    const Todo = await Todos.find({ user: req.user.id });

    if (!Todo) {
      return res.status(400).json({ msg: "No Todos is found" });
    }

    res.status(200).json(Todo);
  } catch (err) {
    console.log(err);

    res.status(500).send("Server Error");
  }
});

// @route api/todo/add
// @desc Create a todo
// @access Private
router.post("/add", auth, async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      msg: "No Token is present",
    });
  }

  try {
    const { text } = req.body;

    let todo = new Todos({
      user: req.user.id,
      text,
    });

    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route api/todo/active
// @desc Get all the active todos of a particular user
// @access Private
router.get("/active", auth, async (req, res) => {
  try {
    const activeTodos = await Todos.find({ user: req.user.id, active: true });

    if (activeTodos.length > 0) {
      res.status(200).json(activeTodos);
    } else {
      res.status(200).json({ msg: "No Todos is present" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route api/todo/completed
// @desc Get all the completed todos
// @access Private
router.get("/completed", auth, async (req, res) => {
  try {
    const completedTodos = await Todos.find({
      user: req.user.id,
      completed: true,
    });
    if (completedTodos.length > 0) {
      res.status(200).json(completedTodos);
    } else {
      res.status(200).json({ msg: "No completed todos found" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route api/todo/update/:id
// @desc Update the text of the Todo
// @access Private
router.put("/update/:id", auth, async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    console.log(todo);

    if (!todo) {
      res.status(401).json({ msg: "No Todo with the particular id exists" });
    }
    if (todo.user !== req.user.id) {
      res.status(401).json({ msg: "User is not authorized to make changes" });
    }
    const changedText = req.body.text;
    console.log(changedText);

    todo.text = changedText;

    await todo.save();
    res.status(200).json({ msg: "Updated Todo Successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route api/todo/udpdatecompleted/:id
// @desc Update the todo as completed or not
// @access Private
router.put("/updatecompleted/:id", auth, async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    if (!todo) {
      res.status(401).json({ msg: "No Todo Found" });
    }
    if (todo.user.toString() !== req.user.id) {
      res.status(404).json({ msg: "User is not authorize to make changes" });
    }
    if (todo.active === true) {
      todo.active = false;
      todo.completed = true;
      await todo.save();
      res.status(200).json({ msg: "🏆 Congratulations on completing Todo" });
    } else {
      todo.active = true;
      todo.completed = false;
      await todo.save();
      res.status(200).json({ msg: "Your Todo is active" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route api/todo/delete/:id
// @desc Delete the Todo with the id
// @access PRIVATE
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);

    if (!todo) {
      res.status(404).json({ msg: "Todo not found" });
    }
    if (req.user.id !== todo.user.toString()) {
      res.status(404).json({ msg: "Not an authorized user" });
    }

    await todo.remove();
    res.status(200).json({ msg: "Todo is removed" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
