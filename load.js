const path = require("path");
const { execSync } = require("child_process");
const { writeFileSync } = require("fs");
const start = path.join(__dirname, "script", "start.sh");
const index = path.join(__dirname, "index.js");
const result = execSync("which node", {
  shell: true,
})
  .toString()
  .split("\n")[0];

console.log(result);

const content = `${result} ${index}`;

writeFileSync(start, content);
