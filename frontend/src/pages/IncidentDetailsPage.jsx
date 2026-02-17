

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getIncidentById, getIncidents, updateIncident } from "../api/incidentApi";

function IncidentDetailsPage() {

  const { id } = useParams();
  

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);


  const fetchIncident = async () => {
    try {
      const res = await getIncidentById(id);
      setIncident(res.data);
    } catch (err) {
      alert("Failed to load incident");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncident();
  }, []);

  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  }

  const handleUpdate = async () => {
    try {
      await updateIncident(id, incident);
      alert("Incident updated!");
      setEditing(false);
      fetchIncident();
     
      
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!incident) return <h2>Incident not found</h2>;

   return (
  <div className="max-w-xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Incident Details</h1>

    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <label className="font-semibold">Title</label>
        {editing ? (
          <input
            name="title"
            value={incident.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p>{incident.title}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Service</label>
        {editing ? (
          <input
            name="service"
            value={incident.service}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p>{incident.service}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Severity</label>
        {editing ? (
          <select
            name="severity"
            value={incident.severity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="SEV1">SEV1</option>
            <option value="SEV2">SEV2</option>
            <option value="SEV3">SEV3</option>
          </select>
        ) : (
          <p>{incident.severity}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Owner</label>
        {editing ? (
          <input
            name="owner"
            value={incident.owner || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p>{incident.owner}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Summary</label>
        {editing ? (
          <textarea
            name="summary"
            value={incident.summary || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p>{incident.summary}</p>
        )}
      </div>

      {editing ? (
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Edit Incident
        </button>
      )}
    </div>
  </div>
);

}

export default IncidentDetailsPage;
