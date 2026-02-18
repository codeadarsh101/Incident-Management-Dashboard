import { useEffect, useState } from "react";
import { getIncidents } from "../api/incidentApi";
import { Link } from "react-router-dom";

function IncidentsPage() {
  const [incidents, setIncidents] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // filters state
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    severity: "",
    status: "",
    service: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const res = await getIncidents(filters); // with updated filters
      setIncidents(res.data.data);
      setMeta(res.data.meta);
    } catch (err) {
      alert("Failed to fetch incidents");
    } finally {
      setLoading(false);
    }
  };

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    fetchIncidents();
  }, [
    filters.page,
    filters.limit,
    debouncedSearch,
    filters.severity,
    filters.status,
    filters.order,
  ]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const nextPage = () => {
    if (filters.page < meta.totalPages)
      setFilters({ ...filters, page: filters.page + 1 });
  };

  const prevPage = () => {
    if (filters.page > 1) setFilters({ ...filters, page: filters.page - 1 });
  };

  if (loading) return <h2>Loading... Please Wait</h2>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Incidents List</h1>

      <div
        className="bg-white p-4 rounded-lg shadow mb-6 
                    flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-center"
      >
        <input
          name="search"
          placeholder="Search incidents..."
          value={filters.search}
          onChange={handleChange}
          className="border p-2 rounded w-full sm:w-64"
        />

        <select
          name="severity"
          value={filters.severity}
          onChange={handleChange}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="">All Severity</option>
          <option value="SEV1">SEV1</option>
          <option value="SEV2">SEV2</option>
          <option value="SEV3">SEV3</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="RESOLVED">RESOLVED</option>
          <option value="MITIGATED">MITIGATED</option>
        </select>

        <select
          name="order"
          value={filters.order}
          onChange={handleChange}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <div className="sm:hidden space-y-4">
        {incidents.map((inc) => (
          <Link key={inc.id} to={`/incident/${inc.id}`}>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="font-bold text-lg text-blue-700">{inc.title}</h2>
              <p className="text-sm text-gray-500">{inc.service}</p>

              <div className="flex justify-between mt-3 text-sm">
                <span className="font-semibold">{inc.severity}</span>
                <span>{inc.owner}</span>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Status: {inc.status}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-4">Title</th>
              <th className="p-4">Service</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {incidents.map((inc) => (
              <tr key={inc.id} className="border-t hover:bg-gray-100">
                <td className="p-4 text-blue-600 font-semibold">
                  <Link to={`/incident/${inc.id}`}>{inc.title}</Link>
                </td>
                <td className="p-4">{inc.service}</td>
                <td className="p-4">{inc.severity}</td>
                <td className="p-4">{inc.owner}</td>
                <td className="p-4">{inc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-center mt-6">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-gray-300 rounded w-full sm:w-auto"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {meta.page} of {meta.totalPages}
        </span>

        <button
          onClick={nextPage}
          className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default IncidentsPage;
