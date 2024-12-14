import { useEffect, useState } from "react";
import AnomalyCard from "./AnomalyCard";

const LiveFeed = () => {
  const [anomalies, setAnomalies] = useState([
    {
      id: 1,
      type: "error" as const,
      title: "Database Connection Failed",
      description: "Unable to establish connection with primary database cluster",
      timestamp: "2 mins ago",
      source: "database" as const,
    },
    {
      id: 2,
      type: "warning" as const,
      title: "High CPU Usage",
      description: "Server CPU utilization exceeded 90% threshold",
      timestamp: "5 mins ago",
      source: "server" as const,
    },
    {
      id: 3,
      type: "info" as const,
      title: "System Update Required",
      description: "New security patches available for installation",
      timestamp: "10 mins ago",
      source: "system" as const,
    },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Live Feed</h2>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>
      <div className="space-y-3">
        {anomalies.map((anomaly) => (
          <AnomalyCard key={anomaly.id} {...anomaly} />
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;