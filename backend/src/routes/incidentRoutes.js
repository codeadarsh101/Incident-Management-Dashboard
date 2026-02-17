

const express = require("express");
const router = express.Router();
const controller = require("../controllers/incidentController"); // import

router.post("/", controller.createIncident);
router.get("/:id", controller.getIncidentById);
router.patch("/:id", controller.updateIncident);

router.get("/", controller.getIncidents); 

module.exports = router;
