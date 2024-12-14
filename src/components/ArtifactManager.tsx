import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ArtifactManager = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newArtifact, setNewArtifact] = useState({ name: "", status: "working" });

  // Fetch artifacts
  const { data: artifacts, refetch } = useQuery({
    queryKey: ["artifacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artifact")
        .select("id, name, status");
      if (error) throw error;
      return data;
    },
  });

  // Add new artifact
  const handleAddArtifact = async () => {
    try {
      const { error } = await supabase.from("artifact").insert([newArtifact]);
      if (error) throw error;
      toast({ title: "Artifact added successfully" });
      setIsAddDialogOpen(false);
      setNewArtifact({ name: "", status: "working" });
      refetch();
    } catch (error) {
      console.error("Error adding artifact:", error);
      toast({
        title: "Error adding artifact",
        variant: "destructive",
      });
    }
  };

  // Delete artifact
  const handleDeleteArtifact = async (id: number) => {
    try {
      const { error } = await supabase.from("artifact").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Artifact deleted successfully" });
      refetch();
    } catch (error) {
      console.error("Error deleting artifact:", error);
      toast({
        title: "Error deleting artifact",
        variant: "destructive",
      });
    }
  };

  // Update artifact status
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("artifact")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Status updated successfully" });
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error updating status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Artifacts</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Artifact</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Artifact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Artifact Name"
                value={newArtifact.name}
                onChange={(e) =>
                  setNewArtifact({ ...newArtifact, name: e.target.value })
                }
              />
              <Button onClick={handleAddArtifact}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artifacts?.map((artifact) => (
            <TableRow key={artifact.id}>
              <TableCell>{artifact.id}</TableCell>
              <TableCell>{artifact.name}</TableCell>
              <TableCell>
                <select
                  className="border rounded p-1"
                  value={artifact.status}
                  onChange={(e) =>
                    handleUpdateStatus(artifact.id, e.target.value)
                  }
                >
                  <option value="working">Working</option>
                  <option value="failed">Failed</option>
                  <option value="completed">Completed</option>
                </select>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteArtifact(artifact.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArtifactManager;