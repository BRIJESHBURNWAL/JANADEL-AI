import { useEffect, useState } from "react";
import axios from "axios";

interface Source {
  id: number;
  name: string;
  source_type: string;
  status: string;
  created_at: string;
}

export default function Sources() {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [status, setStatus] = useState("active");

  const fetchSources = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/sources")
      .then((res) => {
        setSources(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load sources");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sourceType) return;

    axios
      .post("http://127.0.0.1:8000/sources", {
        name,
        source_type: sourceType,
        status,
      })
      .then(() => {
        setName("");
        setSourceType("");
        setStatus("active");
        fetchSources();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add source");
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/sources/${id}`)
      .then(() => {
        fetchSources();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete source");
      });
  };

  if (loading) return <p>Loading sources...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Sources</h1>

      {/* Add Source Form */}
      <form
        onSubmit={handleAdd}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="text"
          placeholder="Type (e.g. Firewall)"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
          style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Source
        </button>
      </form>

      {/* Sources Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Type</th>
            <th style={{ padding: "10px" }}>Status</th>
            <th style={{ padding: "10px" }}>Created At</th>
            <th style={{ padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{source.id}</td>
              <td style={{ padding: "10px" }}>{source.name}</td>
              <td style={{ padding: "10px" }}>{source.source_type}</td>
              <td style={{ padding: "10px" }}>{source.status}</td>
              <td style={{ padding: "10px" }}>
                {new Date(source.created_at).toLocaleString()}
              </td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => handleDelete(source.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}