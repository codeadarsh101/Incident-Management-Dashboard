

const incidentService = require("../services/incidentService"); // import

// Actual req-res cycle...

// POST /api/incidents

exports.createIncident = async (req, res) => {
  try {
    const { title, service, severity, owner, summary } = req.body;

    if (!title || !service || !severity) {
      return res.status(400).json({
        message: "title, service and severity are required",
      });
    }

    const incident = await incidentService.createIncident({
      title,
      service,
      severity,
      owner,
      summary,
    });

    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/incidents/:id
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await incidentService.getIncidentById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/incidents/:id

exports.updateIncident = async (req, res) => {
  try {
    const incident = await incidentService.updateIncident(
      req.params.id,
      req.body
    );
    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getIncidents = async (req, res) => {   // whole incidents
  try {
    const result = await incidentService.getIncidents(req.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

