import puppeteer from "puppeteer";

export default async function problem(problemId) {
  const start = Date.now();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // console.log('https://www.codechef.com/problems/'+problemId);
  await page.goto(`https://www.codechef.com/problems/${problemId}`, {
    waitUntil: "networkidle0",
  });
  // console.log("Page loaded");
  const problem = await page.evaluate(() =>
    document.getElementById("problem-statement")?.innerHTML.toString()
  );

  const end = Date.now();
  console.log(`Time taken to fetch problem statement: ${end - start}ms`);

  return problem;
}
