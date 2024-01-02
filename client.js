const net = require("net");
const readline = require("readline/promises");
const PORT = 8080;
const ipAdress = "::1";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};
const moveLine = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};
const client = net.createConnection(
  { host: ipAdress, port: PORT },
  async () => {
    let id;
    const name = await rl.question("Please enter your name:");
    client.write(`Name:--- ${name}-------`);
    const ask = async () => {
      const message = await rl.question("enter message ");
      await moveLine(0, -1);
      await clearLine(0);
      client.write(Buffer.from(`Name-${name} message-${message}`));
    };
    ask();
    client.on("data", (data) => {
      console.log();
      moveLine(0, -1);
      clearLine(0);
      console.log(data.toString("utf-8"));

      ask();
    });
  }
);
