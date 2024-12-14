import StatCard from "@/components/StatCard";
import MonitoringTabs from "@/components/MonitoringTabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Maintenance Dashboard
          </h1>
          <p className="text-gray-500">Monitor system health and anomalies</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Anomalies"
            value="24"
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Critical Issues"
            value="3"
            trend="down"
            trendValue="8%"
          />
          <StatCard title="Average Response Time" value="230ms" />
          <StatCard title="System Uptime" value="99.9%" />
        </div>

        <MonitoringTabs />
      </div>
    </div>
  );
};

export default Index;