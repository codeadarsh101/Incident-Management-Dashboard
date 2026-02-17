

import { Routes, Route, Link } from "react-router-dom";
import IncidentsPage from "./pages/IncidentsPage.jsx";
import CreateIncidentPage from "./pages/CreateIncidentPage.jsx";
import IncidentDetailsPage from "./pages/IncidentDetailsPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between">
        <h1 className="text-3xl font-bold text-blue-800">Incident Tracker</h1>

        <div className="space-x-6">
          <Link className="text-gray-700 hover:text-blue-700 font-bold" to="/">
            Incidents
          </Link>
          <Link className="text-gray-700 hover:text-blue-700 font-bold" to="/create">
            New Incident
          </Link>
        </div>
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/" element={<IncidentsPage />} />
          <Route path="/create" element={<CreateIncidentPage />} />
          <Route path="/incident/:id" element={<IncidentDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
