import { useEffect, useState } from "react";
import AnomalyCard from "./AnomalyCard";
import { useToast } from "@/hooks/use-toast";

const LiveFeed = () => {
  const { toast } = useToast();
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

  useEffect(() => {
    // Simulate new anomalies being detected
    const interval = setInterval(() => {
      const newAnomaly = {
        id: Date.now(),
        type: Math.random() > 0.5 ? "error" : "warning" as const,
        title: "New Anomaly Detected",
        description: "Unusual behavior detected in system components",
        timestamp: "Just now",
        source: "system" as const,
      };

      setAnomalies(prev => [newAnomaly, ...prev].slice(0, 5));
      
      // Show toast notification for new anomaly
      toast({
        title: "New Anomaly Detected",
        description: "Check the live feed for details",
        variant: newAnomaly.type === "error" ? "destructive" : "default",
      });

      console.log("New anomaly detected:", newAnomaly);
    }, 30000); // New anomaly every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

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