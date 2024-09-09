import http from "http";
import { WebSocketServer } from "ws";
import express from "express"; // Assuming express is also needed in the setup

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Sample SCADA data
const devices = [
  {
    deviceId: "Q0324XX0059",
    deviceName: "tank",
    deviceType: "LT",
    protocol: "RS-485",
    simNo: "9099089074",
    encryptedId: "NTk=",
    hwUniqueNo: "jj",
    isTagged: true,
    representative: {
      name: "Tank",
    },
    tagValue: ["Q0324XX0059", "Q0424XX0027"],
    tankType: "ESR",
    tagOptions: [
      {
        label: "LT",
        code: "code_2",
        items: [
          {
            label: "tank (jj)",
            value: "Q0324XX0059",
            disabled: false,
          },
        ],
      },
      {
        label: "PHTDS",
        code: "code_2",
        items: [
          {
            label: "phtdsmeter (#kgj)",
            value: "Q0424XX0027",
            disabled: true,
          },
          {
            label: "phtdsmeter (23784)",
            value: "Q0424XX0025",
            disabled: false,
          },
          {
            label: "phtdsmeter (jasj)",
            value: "Q0424XX0024",
            disabled: false,
          },
          {
            label: "phtdsmeter (VAE_PHTDS002)",
            value: "Q0424XX0019",
            disabled: false,
          },
        ],
      },
      {
        label: "FLOWMETER",
        code: "code_1",
        items: [
          {
            label: "flowmeter (asmkd)",
            value: "Q0124XX0036",
            disabled: false,
          },
          {
            label: "flowmeter (YUWW)",
            value: "Q0124XX0035",
            disabled: false,
          },
          {
            label: "flowmeter (as)",
            value: "Q0124XX0034",
            disabled: false,
          },
          {
            label: "flowmeter (insert4)",
            value: "Q0124XX0027",
            disabled: false,
          },
          {
            label: "flowmeter (VAE_FL002)",
            value: "Q0124XX0022",
            disabled: false,
          },
        ],
      },
    ],
  },
  {
    deviceId: "Q0324XX0028",
    deviceName: "tank",
    deviceType: "LT",
    protocol: "RS-485",
    simNo: "9512070912",
    encryptedId: "Mjg=",
    hwUniqueNo: "VAE_ESR002",
    isTagged: true,
    representative: {
      name: "Tank",
    },
    tagValue: ["Q0324XX0028"],
    tankType: "ESR",
    tagOptions: [
      {
        label: "LT",
        code: "code_2",
        items: [
          {
            label: "tank (VAE_ESR002)",
            value: "Q0324XX0028",
            disabled: false,
          },
        ],
      },
      {
        label: "PHTDS",
        code: "code_2",
        items: [
          {
            label: "phtdsmeter (#kgj)",
            value: "Q0424XX0027",
            disabled: true,
          },
          {
            label: "phtdsmeter (23784)",
            value: "Q0424XX0025",
            disabled: false,
          },
          {
            label: "phtdsmeter (jasj)",
            value: "Q0424XX0024",
            disabled: false,
          },
          {
            label: "phtdsmeter (VAE_PHTDS002)",
            value: "Q0424XX0019",
            disabled: false,
          },
        ],
      },
      {
        label: "FLOWMETER",
        code: "code_1",
        items: [
          {
            label: "flowmeter (asmkd)",
            value: "Q0124XX0036",
            disabled: false,
          },
          {
            label: "flowmeter (YUWW)",
            value: "Q0124XX0035",
            disabled: false,
          },
          {
            label: "flowmeter (as)",
            value: "Q0124XX0034",
            disabled: false,
          },
          {
            label: "flowmeter (insert4)",
            value: "Q0124XX0027",
            disabled: false,
          },
          {
            label: "flowmeter (VAE_FL002)",
            value: "Q0124XX0022",
            disabled: false,
          },
        ],
      },
    ],
  },
];

function haveSameDateAndMonth(date1, date2) {
  // Helper function to convert a date string to month and date
  function extractMonthAndDate(dateString) {
    const date = new Date(dateString);
    return {
      month: date.getMonth(),
      date: date.getDate(),
    };
  }

  // Adjust date1 to be in a parseable format
  const adjustedDate1 = date1.replace(/(\d+)(st|nd|rd|th)/, "$1");

  const { month: month1, date: date1Day } = extractMonthAndDate(adjustedDate1);
  const { month: month2, date: date2Day } = extractMonthAndDate(date2);

  return month1 === month2 && date1Day === date2Day;
}

const date1 = "19th Jul 3:25:00";
const date2 = "2024-07-19";

console.log(haveSameDateAndMonth(date1, date2)); // Output: true

let template11Details = {
  PrimarySources: {
    templateId: "12345",
    templateTags: [
      {
        tagId: "t1",
        tagName: "esr_tank",
        deviceId: "esr-001",
        deviceName: "Level Sensor",
        deviceType: "Tank Level",
        deviceCount: 5000,
        lowerLimit: 5,
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "t2",
        tagName: "gsr_tank",
        deviceId: "gsr-001",
        deviceName: "Level Sensor",
        deviceType: "Tank Level",
        deviceCount: 5000,
        lowerLimit: 5,
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "t3.1",
        tagName: "pump_i_1",
        deviceId: "pump-001",
        deviceName: "Level Sensor",
        deviceType: "Pump Pressure",
        deviceCount: 300,
        lowerLimit: 5,
        status: "Running",
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
        isActive: false,
      },
      {
        tagId: "t3.2",
        tagName: "pump_i_2",
        deviceId: "pump-0010",
        deviceName: "Level Sensor",
        deviceType: "Pump Pressure",
        deviceCount: 300,
        lowerLimit: 5,
        status: "Running",
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
        isActive: false,
      },
      {
        tagId: "t3.3",
        tagName: "pump_o_1",
        deviceId: "pump-0011",
        deviceName: "Level Sensor",
        deviceType: "Pump Pressure",
        deviceCount: 300,
        lowerLimit: 5,
        status: "Running",
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
        isActive: false,
      },
      {
        tagId: "t3.4",
        tagName: "pump_o_2",
        deviceId: "pump-0014",
        deviceName: "Level Sensor",
        deviceType: "Pump Pressure",
        deviceCount: 300,
        lowerLimit: 5,
        status: "Running",
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
        isActive: false,
      },
      {
        tagId: "t4",
        tagName: "phtds",
        deviceId: "ph-tds-001",
        deviceName: "Level Sensor",
        deviceType: "Water Quality",
        phCount: 6.5,
        phLowerLimit: 5,
        phUpperLimit: 15,
        phMinRange: 0,
        phMaxRange: 14,
        phMinCount: 2,
        phMaxCount: 10,
        tdsCount: 300,
        tdsLowerLimit: 5,
        tdsUpperLimit: 15,
        tdsMinRange: 0,
        tdsMaxRange: 400,
        tdsMinCount: 50,
        tdsMaxCount: 350,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "tpf1",
        tagName: "flowmeter1",
        deviceId: "flow-001",
        deviceName: "Level Sensor",
        deviceType: "Flow Meter",
        flowCount: 5000,
        flowLowerLimit: 5,
        flowUpperLimit: 15,
        flowMinRange: 0,
        flowMaxRange: 10000,
        flowMinCount: 1000,
        flowMaxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "tpf2",
        tagName: "flowmeter2",
        deviceId: "flow-001",
        deviceName: "Level Sensor",
        deviceType: "Flow Meter",
        flowCount: 5000,
        flowLowerLimit: 5,
        flowUpperLimit: 15,
        flowMinRange: 0,
        flowMaxRange: 10000,
        flowMinCount: 1000,
        flowMaxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "tpf3",
        tagName: "flowmeter3",
        deviceId: "flow-001",
        deviceName: "Level Sensor",
        deviceType: "Flow Meter",
        flowCount: 5000,
        flowLowerLimit: 5,
        flowUpperLimit: 15,
        flowMinRange: 0,
        flowMaxRange: 10000,
        flowMinCount: 1000,
        flowMaxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "tpf4",
        tagName: "flowmeter4",
        deviceId: "flow-001",
        deviceName: "Level Sensor",
        deviceType: "Flow Meter",
        flowCount: 5000,
        flowLowerLimit: 5,
        flowUpperLimit: 15,
        flowMinRange: 0,
        flowMaxRange: 10000,
        flowMinCount: 1000,
        flowMaxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
    ],
  },
};
let template5Details = {
  PrimarySources: {
    templateId: "1",
    templateTags: [
      {
        tagId: "t1",
        tagName: "esr_tank",
        deviceId: "esr-001",
        deviceName: "Level Sensor",
        deviceType: "Tank Level",
        deviceCount: 5000,
        lowerLimit: 5,
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "t2",
        tagName: "gsr_tank",
        deviceId: "gsr-001",
        deviceName: "Level Sensor",
        deviceType: "Tank Level",
        deviceCount: 5000,
        lowerLimit: 5,
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "t3",
        tagName: "pump",
        deviceId: "pump-001",
        deviceName: "Level Sensor",
        deviceType: "Pump Pressure",
        deviceCount: 300,
        lowerLimit: 5,
        status: "Running",
        upperLimit: 15,
        minRange: 0,
        maxRange: 10000,
        minCount: 1000,
        maxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
        isActive: true,
      },
      {
        tagId: "t4",
        tagName: "phtds",
        deviceId: "ph-tds-001",
        deviceName: "Level Sensor",
        deviceType: "Water Quality",
        phCount: 6.5,
        phLowerLimit: 5,
        phUpperLimit: 15,
        phMinRange: 0,
        phMaxRange: 14,
        phMinCount: 2,
        phMaxCount: 10,
        tdsCount: 300,
        tdsLowerLimit: 5,
        tdsUpperLimit: 15,
        tdsMinRange: 0,
        tdsMaxRange: 400,
        tdsMinCount: 50,
        tdsMaxCount: 350,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
      {
        tagId: "t5",
        tagName: "flow",
        deviceId: "flow-001",
        deviceName: "Level Sensor",
        deviceType: "Flow Meter",
        flowCount: 5000,
        flowLowerLimit: 5,
        flowUpperLimit: 15,
        flowMinRange: 0,
        flowMaxRange: 10000,
        flowMinCount: 1000,
        flowMaxCount: 9000,
        timestamp: "2024-06-27 11:38:11",
        unit: "meters",
      },
    ],
  },
};

const updateDeviceCount = (sources) => {
  // Create a deep copy of the sources object to avoid direct mutation
  const updatedSources = JSON.parse(JSON.stringify(sources));

  // Helper function to traverse and update `deviceCount`
  const updateTags = (obj) => {
    if (Array.isArray(obj)) {
      // If it's an array, process each element
      obj.forEach(updateTags);
    } else if (obj !== null && typeof obj === "object") {
      // If it's an object, check if it has a `tags` property
      if (obj.templateTags) {
        // Update `deviceCount` for each tag
        obj.templateTags.forEach((tag) => {
          if (tag.hasOwnProperty("phCount")) {
            tag.phCount =
              Math.floor(
                Math.random() * (tag?.phMaxCount - tag?.phMinCount + 1)
              ) + tag?.phMinCount;
          }
          if (tag.hasOwnProperty("tdsCount")) {
            tag.tdsCount =
              Math.floor(
                Math.random() * (tag?.tdsMaxCount - tag?.tdsMinCount + 1)
              ) + tag?.tdsMinCount;
          }
          if (tag.hasOwnProperty("flowCount")) {
            tag.flowCount =
              Math.floor(
                Math.random() * (tag?.flowMaxCount - tag?.flowMinCount + 1)
              ) + tag?.flowMinCount;
          }
          tag.deviceCount =
            Math.floor(Math.random() * (tag?.maxCount - tag?.minCount + 1)) +
            tag?.minCount;
        });
      }
      // Continue traversing other properties
      Object.values(obj).forEach(updateTags);
    }
  };

  // Start the traversal and update process
  updateTags(updatedSources);

  return updatedSources;
};

// Example usage:

// Function to send simulated SCADA data
const sendScadaData = (ws) => {
  // let { PrimarySources } = template5Details;
  // const updatedPrimarySources = updateDeviceCount(PrimarySources);
  // // console.log(updatedPrimarySources);
  // // console.log("updatedPrimarySources", updatedPrimarySources);
  ws.send(JSON.stringify(updatedPrimarySources));
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
