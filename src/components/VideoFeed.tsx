import React, { useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VideoFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Request access to the webcam
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("Camera stream started successfully");
          toast({
            title: "Camera Connected",
            description: "Live video feed is now active",
          });
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast({
          variant: "destructive",
          title: "Camera Error",
          description: "Unable to access camera feed",
        });
      }
    }

    setupCamera();

    // Cleanup function to stop the video stream
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="relative rounded-lg border border-gray-100 bg-white/50 p-4 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Live Camera Feed</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default VideoFeed;