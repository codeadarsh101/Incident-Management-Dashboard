import { useState } from "react";
import { createIncident } from "../api/incidentApi";
import { useNavigate } from "react-router-dom";

function CreateIncidentPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    service: "",
    severity: "SEV1",
    owner: "",
    summary: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createIncident(form); // api calling
      alert("Incident created!");
      navigate("/");
    } catch (err) {
      alert("Error creating incident");
    }
  };

    return (
  <div className="max-w-xl mx-auto px-3 sm:px-0">
    
  
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
      Create Incident
    </h1>

    
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4"
    >
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        name="service"
        placeholder="Service"
        onChange={handleChange}
        required
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        name="severity"
        onChange={handleChange}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="SEV1">SEV1</option>
        <option value="SEV2">SEV2</option>
        <option value="SEV3">SEV3</option>
      </select>

      <input
        name="owner"
        placeholder="Owner"
        onChange={handleChange}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        name="summary"
        placeholder="Summary"
        rows="4"
        onChange={handleChange}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200">
        Create Incident
      </button>
    </form>
  </div>
);

}

export default CreateIncidentPage;
