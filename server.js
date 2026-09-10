const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./database/connection");
const Todo = require("./database/tables/todo");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World--!");
});

app.post("/create-todo", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    res.status(201).json({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create todo",
      error: error.message,
    });
  }
});

app.get("/all-todos", async (req, res) => {
  try {
    console.log("here");
    const result = await Todo.findAll({ raw: true });
    console.log(result[0]);
    res.send({ status: 200, data: result });
  } catch (error) {
    console.error("ERROR:", error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
