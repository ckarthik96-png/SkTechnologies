const fs = require("fs");
let c = fs.readFileSync("scripts/generate-pdfs.mjs", "utf8");
const pairs = [
  ["\u2192", "->"],
  ["\u00d7", "x"],
  ["\u2022", "*"],
  ["\u2019", "'"],
  ["\u201c", '"'],
  ["\u201d", '"'],
  ["\u2013", "-"],
  ["\u2014", "--"],
];
pairs.forEach(([ch, rep]) => {
  c = c.split(ch).join(rep);
});
fs.writeFileSync("scripts/generate-pdfs.mjs", c, "utf8");
console.log("Done - special chars replaced");
