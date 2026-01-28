const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/create", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
    console.log(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was a problem trying to create a task" });
  }
});

router.get("/tasks", async (req, res) => {
  const tasks = await Task.find({}); //!obtengo todas
  if (!tasks) {
    throw new Error("Bad Request! tasks not found");
  }
  res.json(tasks);
});

router.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new Error("Bad Request! task not found");
  }
  res.json(task);
});

router.put("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new Error("Bad Request! task not found");
  }
  //actualizamos
  const { title, completed } = req.body;
  await task.updateOne({ title, completed });
  res.send("Actualizado Correctamente");
  console.log(" actualizado correctamente", task);
});

router.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new Error("Bad Request! task not found");
  }
  //borramos
  await task.deleteOne();
  res.send("eliminado correctamente");
  console.log(" eliminado correctamente", task);
});

module.exports = router;
