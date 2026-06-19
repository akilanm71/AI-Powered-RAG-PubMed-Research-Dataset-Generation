import { useState } from "react";
import api from "../services/api";
import StatsCard from "../components/StatsCard";
import DeleteButtons from "../components/DeleteButtons";

function Dashboard() {

  const [stats,setStats] = useState(null);

  const loadStats = async () => {

    const response = await api.get("/stats");

    setStats(response.data);
  };

  return (

    <div>

      <h2>Dashboard</h2>

      <button onClick={loadStats}>
  Load Stats
</button>

{stats && (
  <div
    style={{
      display: "flex",
      gap: "20px",
      marginTop: "20px",
      flexWrap: "wrap",
    }}
  >
    <StatsCard
      title="Documents"
      value={stats.documents?.total || 0}
    />

    <StatsCard
      title="Datasets"
      value={stats.datasets?.total || 0}
    />

    <StatsCard
      title="Jobs"
      value={stats.jobs?.total || 0}
    />
  </div>
)}
    <DeleteButtons />
    </div>
  );
}

export default Dashboard;