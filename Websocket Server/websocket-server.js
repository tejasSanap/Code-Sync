const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const wss = new WebSocket.Server({ port: 8080 });
let lastSentCode = "";

const filePath = path.join(__dirname, "receivedCode.js");
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "", (err) => {
    if (err) {
      console.error("Error creating file:", err);
    }
  });
}

wss.on("connection", (ws) => {
  console.log("Client connected");

  fs.watch(filePath, (eventType) => {
    if (eventType === "change") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }
        if (data !== lastSentCode) {
          ws.send(data);
          lastSentCode = data;
        }
      });
    }
  });

  ws.on("message", (message) => {
    console.log("Received");
    if (message !== lastSentCode) {
      fs.writeFile(filePath, message, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return;
        }
        lastSentCode = message;
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
