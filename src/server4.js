import http from "http";
import { WebSocketServer } from "ws";
import express from "express"; // Assuming express is also needed in the setup

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Function to simulate SCADA data
const template1Data = {
  templateId: 1, // Assume we're sending data for template 4
  data: [
    { tagCode: "t4", value: Math.floor(Math.random() * 15), valueType: "ph" }, // ph
    { tagCode: "t4", value: Math.floor(Math.random() * 301), valueType: "tds" }, // tds
    { tagCode: "t5", value: Math.floor(Math.random() * 201) }, // flow
    // { tagId: "t3pressure1", value: Math.floor(Math.random() * 101) }, // pressure
    {
      tagCode: "t1",
      value: Math.floor(Math.random() * 300001),
      minRange: 0,
      maxRange: 300001,
      minCount: 80,
      maxCount: 960,
    }, // esr
    {
      tagCode: "t2",
      value: Math.floor(Math.random() * 150001),
      minRange: 0,
      maxRange: 150001,
      minCount: 80,
      maxCount: 960,
    }, // gsr
    { tagCode: "t3", value: "Running" }, // pump status
  ],
};
const template3Data = {
  templateId: 3,
  data: [
    {
      tagCode: "t3ph1",
      value: 7, // actualCount
      valueType: "ph", // pH sensor
      minCount: 3,
      maxCount: 12,
      description: "pH Sensor for Measuring Acidity/Alkalinity",
    },
    {
      tagCode: "t3ph1",
      value: Math.floor(Math.random() * 301),
      valueType: "tds", // TDS sensor
      minCount: 100,
      maxCount: 250,
      description: "Total Dissolved Solids Sensor",
    },
    {
      tagCode: "t3f1",
      value: Math.floor(Math.random() * 201),
      valueType: "flow", // Flow sensor
      minCount: 50,
      maxCount: 180,
      description: "Flow Sensor for Measuring Water Flow",
    },
    {
      tagCode: "t3pressure1",
      value: Math.floor(Math.random() * 101),
      valueType: "pressure", // Pressure sensor
      minCount: 20,
      maxCount: 80,
      description: "Pressure Sensor for Measuring Tank Pressure",
    },
    {
      tagCode: "t3esr1",
      value: Math.floor(Math.random() * 300001),
      valueType: "esr", // Elevated Storage Tank
      minCount: 100000,
      maxCount: 250000,
      description: "Elevated Storage Tank for Water Level Monitoring",
    },
    {
      tagCode: "t3gsr1",
      value: Math.floor(Math.random() * 150001),
      valueType: "gsr", // Ground Storage Tank
      minCount: 50000,
      maxCount: 120000,
      description: "Ground Storage Tank for Water Level Monitoring",
    },
    {
      tagCode: "t3p1",
      status: "Running",
      valueType: "status", // Pump status
      description: "Pump Status",
    },
  ],
};
const generateScadaData = () => {
  return template1Data;
};

// Function to send simulated SCADA data
const sendScadaData = (ws) => {
  const simulatedData = generateScadaData();
  ws.send(JSON.stringify(simulatedData));
};

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send data initially on connection
  sendScadaData(ws);

  // Optionally, simulate periodic updates
  const interval = setInterval(() => {
    sendScadaData(ws);
  }, 5000); // every 5 seconds

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

server.listen(8585, () => {
  console.log("Server is listening on port 8585");
});
