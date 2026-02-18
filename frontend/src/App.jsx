import { Routes, Route, Link } from "react-router-dom";
import IncidentsPage from "./pages/IncidentsPage.jsx";
import CreateIncidentPage from "./pages/CreateIncidentPage.jsx";
import IncidentDetailsPage from "./pages/IncidentDetailsPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav
        className="bg-white shadow-md px-4 sm:px-8 py-4 
                      flex flex-col sm:flex-row 
                      sm:items-center sm:justify-between 
                      gap-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center sm:text-left">
          Incident Tracker
        </h1>

        <div className="flex justify-center sm:justify-end gap-6 font-bold">
          <Link className="text-gray-700 hover:text-blue-700" to="/">
            Incidents
          </Link>
          <Link className="text-gray-700 hover:text-blue-700" to="/create">
            New Incident
          </Link>
        </div>
      </nav>

      <div className="p-4 sm:p-6 lg:p-8">
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
