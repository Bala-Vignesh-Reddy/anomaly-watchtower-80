import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, AlignHorizontalDistributeCenter, RotateCcw, Clock, RadioTower, CheckCircle, XCircle } from "lucide-react";
import VideoFeed from "./VideoFeed";
import LiveFeed from "./LiveFeed";

const MonitoringTabs = () => {
  return (
    <Tabs defaultValue="fault" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="fault" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>Fault Detection</span>
          <span className="ml-auto">
            <XCircle className="h-3 w-3 text-red-500" />
          </span>
        </TabsTrigger>
        <TabsTrigger value="misalignment" className="flex items-center gap-2">
          <AlignHorizontalDistributeCenter className="h-4 w-4" />
          <span>Misalignment</span>
          <span className="ml-auto">
            <CheckCircle className="h-3 w-3 text-green-500" />
          </span>
        </TabsTrigger>
        <TabsTrigger value="motion" className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          <span>Motion Defect</span>
          <span className="ml-auto">
            <CheckCircle className="h-3 w-3 text-green-500" />
          </span>
        </TabsTrigger>
        <TabsTrigger value="predictive" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Predictive</span>
          <span className="ml-auto">
            <XCircle className="h-3 w-3 text-red-500" />
          </span>
        </TabsTrigger>
        <TabsTrigger value="proximity" className="flex items-center gap-2">
          <RadioTower className="h-4 w-4" />
          <span>Proximity</span>
          <span className="ml-auto">
            <CheckCircle className="h-3 w-3 text-green-500" />
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="fault" className="mt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <VideoFeed />
          <LiveFeed />
        </div>
      </TabsContent>

      <TabsContent value="misalignment" className="mt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <VideoFeed />
          <LiveFeed />
        </div>
      </TabsContent>

      <TabsContent value="motion" className="mt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <VideoFeed />
          <LiveFeed />
        </div>
      </TabsContent>

      <TabsContent value="predictive" className="mt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <VideoFeed />
          <LiveFeed />
        </div>
      </TabsContent>

      <TabsContent value="proximity" className="mt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <VideoFeed />
          <LiveFeed />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MonitoringTabs;