
const express = require("express");
const cors = require("cors");

const incidentRoutes = require("./routes/incidentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/incidents", incidentRoutes);

module.exports = app;
