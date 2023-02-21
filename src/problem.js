import puppeteer from "puppeteer";
import fs from "fs";
import parser from "./parser.js";

export default async function problem(problemId) {
  const start = Date.now();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page
    .goto(`https://www.codechef.com/problems/${problemId}`, {
      waitUntil: "networkidle0",
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  const problem = await page.evaluate(() =>
    document.getElementById("problem-statement")?.innerHTML.toString()
  );

  await fs.promises.writeFile(
    "./src/problem files/problem.txt",
    problem,
    (err) => {
      if (err) {
        console.log(err);
        return null;
      }
    }
  );

  const parsedProblem = await parser();

  browser.close();

  const end = Date.now();
  console.log(`Time taken to fetch problem statement: ${end - start}ms`);

  return { problem, parsedProblem };
}
