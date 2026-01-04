import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2,
  Video,
  Image,
  FileText,
  Headphones,
  Calendar,
  Clock,
  Eye,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

type ContentType = "video" | "image" | "audio" | "text" | "flyer";
type BoardStatus = "draft" | "scheduled" | "published" | "archived";

interface BoardItem {
  id: string;
  title: string;
  content_type: string;
  content_text: string | null;
  content_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  is_active: boolean | null;
  display_order: number | null;
  publish_at: string | null;
  expire_at: string | null;
  created_at: string;
  updated_at: string;
}

interface BoardFormData {
  title: string;
  content_type: ContentType;
  content_text: string;
  content_url: string;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  display_order: number;
  publish_at: string;
  expire_at: string;
}

const contentTypes: { value: ContentType; label: string }[] = [
  { value: "video", label: "Video" },
  { value: "image", label: "Image" },
  { value: "audio", label: "Audio" },
  { value: "text", label: "Text" },
  { value: "flyer", label: "Flyer" },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "video": return Video;
    case "image": 
    case "flyer": return Image;
    case "audio": return Headphones;
    default: return FileText;
  }
};

const getStatus = (item: BoardItem): BoardStatus => {
  if (!item.is_active) return "archived";
  
  const now = new Date();
  const publishAt = item.publish_at ? new Date(item.publish_at) : null;
  const expireAt = item.expire_at ? new Date(item.expire_at) : null;
  
  if (expireAt && now > expireAt) return "archived";
  if (publishAt && now < publishAt) return "scheduled";
  if (item.is_active) return "published";
  
  return "draft";
};

const getStatusBadge = (status: BoardStatus) => {
  switch (status) {
    case "published":
      return <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>;
    case "scheduled":
      return <Badge className="bg-blue-500 hover:bg-blue-600">Scheduled</Badge>;
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "archived":
      return <Badge variant="outline" className="text-muted-foreground">Archived</Badge>;
  }
};

const emptyFormData: BoardFormData = {
  title: "",
  content_type: "text",
  content_text: "",
  content_url: "",
  cta_text: "",
  cta_link: "",
  is_active: true,
  display_order: 0,
  publish_at: "",
  expire_at: "",
};

export const DigitalBoardAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BoardItem | null>(null);
  const [formData, setFormData] = useState<BoardFormData>(emptyFormData);
  const [filterStatus, setFilterStatus] = useState<BoardStatus | "all">("all");
  const queryClient = useQueryClient();

  const { data: boardItems = [], isLoading } = useQuery({
    queryKey: ['digital-board-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('digital_board_items')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BoardItem[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: BoardFormData) => {
      const payload = {
        title: data.title,
        content_type: data.content_type,
        content_text: data.content_text || null,
        content_url: data.content_url || null,
        cta_text: data.cta_text || null,
        cta_link: data.cta_link || null,
        is_active: data.is_active,
        display_order: data.display_order,
        publish_at: data.publish_at || null,
        expire_at: data.expire_at || null,
      };
      const { error } = await supabase
        .from('digital_board_items')
        .insert([payload]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-board-admin'] });
      queryClient.invalidateQueries({ queryKey: ['digital-board'] });
      toast.success("Board item created successfully");
      setIsDialogOpen(false);
      setFormData(emptyFormData);
    },
    onError: (error) => {
      toast.error("Failed to create item: " + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BoardFormData }) => {
      const payload = {
        title: data.title,
        content_type: data.content_type,
        content_text: data.content_text || null,
        content_url: data.content_url || null,
        cta_text: data.cta_text || null,
        cta_link: data.cta_link || null,
        is_active: data.is_active,
        display_order: data.display_order,
        publish_at: data.publish_at || null,
        expire_at: data.expire_at || null,
      };
      const { error } = await supabase
        .from('digital_board_items')
        .update(payload)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-board-admin'] });
      queryClient.invalidateQueries({ queryKey: ['digital-board'] });
      toast.success("Board item updated successfully");
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData(emptyFormData);
    },
    onError: (error) => {
      toast.error("Failed to update item: " + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('digital_board_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-board-admin'] });
      queryClient.invalidateQueries({ queryKey: ['digital-board'] });
      toast.success("Board item deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete item: " + error.message);
    }
  });

  const handleOpenDialog = (item?: BoardItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        content_type: item.content_type as ContentType,
        content_text: item.content_text || "",
        content_url: item.content_url || "",
        cta_text: item.cta_text || "",
        cta_link: item.cta_link || "",
        is_active: item.is_active ?? true,
        display_order: item.display_order ?? 0,
        publish_at: item.publish_at ? format(new Date(item.publish_at), "yyyy-MM-dd'T'HH:mm") : "",
        expire_at: item.expire_at ? format(new Date(item.expire_at), "yyyy-MM-dd'T'HH:mm") : "",
      });
    } else {
      setEditingItem(null);
      setFormData(emptyFormData);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredItems = filterStatus === "all" 
    ? boardItems 
    : boardItems.filter(item => getStatus(item) === filterStatus);

  const isPending = createMutation.isPending || updateMutation.isPending;
  const TypeIcon = getTypeIcon(formData.content_type);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">Digital Board Management</h2>
          <p className="text-muted-foreground">Manage homepage announcements, videos, and updates</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-primary">
                {editingItem ? "Edit Board Item" : "Add New Board Item"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Content Type *</label>
                  <select
                    value={formData.content_type}
                    onChange={(e) => setFormData({ ...formData, content_type: e.target.value as ContentType })}
                    className="w-full h-10 px-3 border rounded-md bg-background"
                  >
                    {contentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority (Display Order)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Lower = higher priority</p>
                </div>
              </div>

              {formData.content_type === "text" ? (
                <div>
                  <label className="block text-sm font-medium mb-1">Content Text</label>
                  <Textarea
                    value={formData.content_text}
                    onChange={(e) => setFormData({ ...formData, content_text: e.target.value })}
                    placeholder="Enter announcement text..."
                    rows={4}
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {formData.content_type === "video" ? "Video URL" : 
                     formData.content_type === "audio" ? "Audio URL" : "Image URL"}
                  </label>
                  <Input
                    value={formData.content_url}
                    onChange={(e) => setFormData({ ...formData, content_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Schedule
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Publish At</label>
                    <Input
                      type="datetime-local"
                      value={formData.publish_at}
                      onChange={(e) => setFormData({ ...formData, publish_at: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Leave empty for immediate</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Expire At</label>
                    <Input
                      type="datetime-local"
                      value={formData.expire_at}
                      onChange={(e) => setFormData({ ...formData, expire_at: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Leave empty for no expiry</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Call to Action (Optional)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                    <Input
                      value={formData.cta_text}
                      onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                      placeholder="Learn More"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CTA Link</label>
                    <Input
                      value={formData.cta_link}
                      onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                      placeholder="/programs or https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="is_active" className="text-sm">
                  Active (visible on homepage when scheduled)
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingItem ? "Update Item" : "Create Item"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
      {(["all", "published", "scheduled", "draft", "archived"] as const).map((statusOption) => (
          <Button
            key={statusOption}
            variant={filterStatus === statusOption ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(statusOption)}
          >
            {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
            {statusOption !== "all" && (
              <span className="ml-1 text-xs">
                ({boardItems.filter(item => getStatus(item) === statusOption).length})
              </span>
            )}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No board items found</p>
          <Button onClick={() => handleOpenDialog()} className="mt-4">
            <Plus className="w-4 h-4 mr-2" /> Add First Item
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Order</TableHead>
                <TableHead className="w-12">Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const Icon = getTypeIcon(item.content_type);
                const status = getStatus(item);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <span className="font-mono text-sm">{item.display_order ?? 0}</span>
                    </TableCell>
                    <TableCell>
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{getStatusBadge(status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.publish_at && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(item.publish_at), "MMM d, yyyy HH:mm")}
                        </div>
                      )}
                      {item.expire_at && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <ArrowDown className="w-3 h-3" />
                          {format(new Date(item.expire_at), "MMM d, yyyy HH:mm")}
                        </div>
                      )}
                      {!item.publish_at && !item.expire_at && "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(item)}
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("Delete this board item?")) {
                              deleteMutation.mutate(item.id);
                            }
                          }}
                          title="Delete"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
