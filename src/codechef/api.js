import { Router } from "express";
import axios from "axios";

const api = Router();

api.get("/", (req, res) => {
  res.send("You are here on API route");
});

api.get("/problem/:problemId", async (req, res) => {
  var problem = await axios
    .get(
      `https://www.codechef.com/api/contests/PRACTICE/problems/${req.params.problemId}`
    )
    .then((response) => {
      return response.data;
    });
  res.send(problem);
});

api.get("/contest/:contestId", async (req, res) => {
  var contest = await axios
    .get(`https://www.codechef.com/api/contests/${req.params.contestId}`)
    .then((response) => {
      return response.data;
    });
  res.send(contest);
});

export { api };
