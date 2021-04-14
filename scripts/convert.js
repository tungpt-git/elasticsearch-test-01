const readline = require("readline");
const fs = require("fs");

const path = {
  data: "data.json",
  temp: "temp.json",
  source: "raw.txt",
};

fs.writeFile(path.data, "", { flag: "a+" }, function (err) {
  if (err) throw err;
  console.log("It's saved!");
});

fs.writeFile(path.temp, "", { flag: "a+" }, function (err) {
  if (err) throw err;
  console.log("It's saved!");
});

let readInterface = readline.createInterface({
  input: fs.createReadStream(`${path.source}`),
  console: false,
});

fs.truncate(`${path.temp}`, 0, function () {
  console.log("done");
});

const obj = {};
const convert = async () => {
  for await (const line of readInterface) {
    const [name, start, end, text] = line.split("-");
    if (!obj[name]) {
      obj[name] = { name, segments: [] };
    }
    obj[name].segments.push({
      start: +start,
      end: +end,
      text: text.replace(/\s\s+/g, " ").trim(),
    });
  }
};

convert().then(() => {
  Object.values(obj).forEach((item) => {
    fs.appendFile(
      `${path.temp}`,
      JSON.stringify(item) + "\r\n",
      function (err) {
        if (err) {
          // append failed
          console.log("ERROR", err);
        } else {
          // done
        }
      }
    );
  });
});

readInterface = readline.createInterface({
  input: fs.createReadStream(`${path.temp}`),
  console: false,
});

let id = 1;

readInterface.on("line", (line) => {
  fs.appendFile(
    `${path.data}`,
    `${JSON.stringify({ index: { _id: id++ } })}\r\n${line}\r\n`,
    function (err) {
      if (err) {
        // append failed
        console.log("ERROR", err);
      } else {
        // done
      }
    }
  );
});
