

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
  <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Incident Details</h1>

    <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-5">
      
      <div>
        <label className="font-semibold text-sm text-gray-600">Title</label>
        {editing ? (
          <input
            name="title"
            value={incident.title}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        ) : (
          <p className="mt-1">{incident.title}</p>
        )}
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-600">Service</label>
        {editing ? (
          <input
            name="service"
            value={incident.service}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        ) : (
          <p className="mt-1">{incident.service}</p>
        )}
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-600">Severity</label>
        {editing ? (
          <select
            name="severity"
            value={incident.severity}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="SEV1">SEV1</option>
            <option value="SEV2">SEV2</option>
            <option value="SEV3">SEV3</option>
          </select>
        ) : (
          <p className="mt-1">{incident.severity}</p>
        )}
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-600">Owner</label>
        {editing ? (
          <input
            name="owner"
            value={incident.owner || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        ) : (
          <p className="mt-1">{incident.owner}</p>
        )}
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-600">Summary</label>
        {editing ? (
          <textarea
            name="summary"
            value={incident.summary || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            rows={4}
          />
        ) : (
          <p className="mt-1">{incident.summary}</p>
        )}
      </div>

      <button
        onClick={editing ? handleUpdate : () => setEditing(true)}
        className={`w-full py-2 rounded text-white font-semibold transition 
        ${editing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {editing ? "Save Changes" : "Edit Incident"}
      </button>

    </div>
  </div>
);


}

export default IncidentDetailsPage;
