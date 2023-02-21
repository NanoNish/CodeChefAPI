import fs from "fs";
import readline from "readline";

var obj = {
  problem: "",
  input: "",
  output: "",
  constraints: "",
  sampleInput: "",
  sampleOutput: "",
};

async function fillLine(data, header) {
  obj[header] = obj[header] + data + "\n";
}

async function processLineByLine() {
  const fileStream = fs.createReadStream(
    "./src/problem files/parsedproblem.txt"
  );
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let header = "";

  for await (const line of rl) {
    switch (line) {
      case "Problem":
        header = "problem";
        break;
      case "Input":
        header = "input";
        break;
      case "Output":
        header = "output";
        break;
      case "Constraints":
        header = "constraints";
        break;
      case "Sample Input":
        header = "sampleInput";
        break;
      case "Sample Output":
        header = "sampleOutput";
        break;
      default:
        await fillLine(line, header);
    }
  }
}

export default async function parser() {
  var file = await fs.promises.readFile(
    "./src/problem files/problem.txt",
    "utf8"
  );
  var data = await file.replaceAll(/<[^>]*>/gi, "");
  await fs.promises.writeFile("./src/problem files/parsedproblem.txt", data);
  await processLineByLine();
  // console.log(obj)
  return obj;
}

// parser();
