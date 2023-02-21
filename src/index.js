// const express = require('express');
import express from "express";

// problem = require('./problem');
import { api as api } from "./codechef/api.js";
import problem from "./problem.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hey There!!!");
});

app.get("/problem/:problemId", async (req, res) => {
  const temp = await problem(req.params.problemId);
  const problemStatement = temp.problem;
  const parsedProblem = temp.parsedProblem;
  if (problemStatement == null) {
    res.status(404).send("Problem not found");
    return;
  }
  res.status(200).send(parsedProblem);
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
