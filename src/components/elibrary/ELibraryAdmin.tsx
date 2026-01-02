import { useState, useRef } from "react";
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
import { 
  Plus, 
  Pencil, 
  Trash2, 
  BookOpen,
  FileText,
  Video,
  Headphones,
  Loader2,
  Eye,
  EyeOff,
  Upload,
  X,
  Image
} from "lucide-react";
import { toast } from "sonner";

type ResourceType = "ebook" | "journal" | "video" | "audio";

interface Resource {
  id: string;
  title: string;
  author: string;
  category: string;
  resource_type: ResourceType;
  description: string | null;
  download_count: number | null;
  cover_url: string | null;
  resource_url: string | null;
  is_published: boolean | null;
}

interface ResourceFormData {
  title: string;
  author: string;
  category: string;
  resource_type: ResourceType;
  description: string;
  cover_url: string;
  resource_url: string;
  is_published: boolean;
}

const categories = [
  "Literature",
  "History",
  "Language",
  "Agriculture",
  "Education",
  "Law",
  "Health",
  "Economics",
  "Culture",
  "Arts",
  "Science"
];

const resourceTypes: { value: ResourceType; label: string }[] = [
  { value: "ebook", label: "E-Book" },
  { value: "journal", label: "Journal" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" }
];

const getTypeIcon = (type: ResourceType) => {
  switch (type) {
    case "ebook": return BookOpen;
    case "journal": return FileText;
    case "video": return Video;
    case "audio": return Headphones;
  }
};

const getAcceptedFileTypes = (type: ResourceType) => {
  switch (type) {
    case "ebook":
    case "journal":
      return ".pdf,.epub,.doc,.docx";
    case "video":
      return ".mp4,.webm,.mov,.avi";
    case "audio":
      return ".mp3,.wav,.ogg,.m4a";
  }
};

const emptyFormData: ResourceFormData = {
  title: "",
  author: "",
  category: "Education",
  resource_type: "ebook",
  description: "",
  cover_url: "",
  resource_url: "",
  is_published: true
};

export const ELibraryAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState<ResourceFormData>(emptyFormData);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingResource, setIsUploadingResource] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const resourceInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['elibrary-resources-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('elibrary_resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Resource[];
    }
  });

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('elibrary')
      .upload(fileName, file);
    
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
      .from('elibrary')
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    
    setIsUploadingCover(true);
    try {
      const url = await uploadFile(file, 'covers');
      setFormData({ ...formData, cover_url: url });
      toast.success("Cover image uploaded");
    } catch (error: any) {
      toast.error("Failed to upload cover: " + error.message);
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleResourceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 100 * 1024 * 1024) {
      toast.error("File must be less than 100MB");
      return;
    }
    
    setIsUploadingResource(true);
    try {
      const url = await uploadFile(file, 'resources');
      setFormData({ ...formData, resource_url: url });
      toast.success("Resource file uploaded");
    } catch (error: any) {
      toast.error("Failed to upload resource: " + error.message);
    } finally {
      setIsUploadingResource(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: ResourceFormData) => {
      const { error } = await supabase
        .from('elibrary_resources')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elibrary-resources-admin'] });
      queryClient.invalidateQueries({ queryKey: ['elibrary-resources'] });
      toast.success("Resource created successfully");
      setIsDialogOpen(false);
      setFormData(emptyFormData);
    },
    onError: (error) => {
      toast.error("Failed to create resource: " + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ResourceFormData }) => {
      const { error } = await supabase
        .from('elibrary_resources')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elibrary-resources-admin'] });
      queryClient.invalidateQueries({ queryKey: ['elibrary-resources'] });
      toast.success("Resource updated successfully");
      setIsDialogOpen(false);
      setEditingResource(null);
      setFormData(emptyFormData);
    },
    onError: (error) => {
      toast.error("Failed to update resource: " + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('elibrary_resources')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elibrary-resources-admin'] });
      queryClient.invalidateQueries({ queryKey: ['elibrary-resources'] });
      toast.success("Resource deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete resource: " + error.message);
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from('elibrary_resources')
        .update({ is_published })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elibrary-resources-admin'] });
      queryClient.invalidateQueries({ queryKey: ['elibrary-resources'] });
      toast.success("Resource visibility updated");
    },
    onError: (error) => {
      toast.error("Failed to update visibility: " + error.message);
    }
  });

  const handleOpenDialog = (resource?: Resource) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        title: resource.title,
        author: resource.author,
        category: resource.category,
        resource_type: resource.resource_type,
        description: resource.description || "",
        cover_url: resource.cover_url || "",
        resource_url: resource.resource_url || "",
        is_published: resource.is_published ?? true
      });
    } else {
      setEditingResource(null);
      setFormData(emptyFormData);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingResource) {
      updateMutation.mutate({ id: editingResource.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#0000CD' }}>eLibrary Resources</h2>
          <p className="text-gray-600">Manage books, journals, videos, and audio resources</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => handleOpenDialog()}
              className="border-2 border-black"
              style={{ backgroundColor: '#FFD700', color: '#000' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle style={{ color: '#0000CD' }}>
                {editingResource ? "Edit Resource" : "Add New Resource"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author *</label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 px-3 border rounded-md"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type *</label>
                  <select
                    value={formData.resource_type}
                    onChange={(e) => setFormData({ ...formData, resource_type: e.target.value as ResourceType })}
                    className="w-full h-10 px-3 border rounded-md"
                    required
                  >
                    {resourceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
                {formData.cover_url ? (
                  <div className="relative w-32 h-40 border-2 border-black rounded-lg overflow-hidden">
                    <img 
                      src={formData.cover_url} 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, cover_url: "" })}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={isUploadingCover}
                    className="w-full border-dashed"
                  >
                    {isUploadingCover ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
                    ) : (
                      <><Image className="w-4 h-4 mr-2" /> Upload Cover Image</>
                    )}
                  </Button>
                )}
              </div>

              {/* Resource File Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Resource File ({formData.resource_type === 'ebook' || formData.resource_type === 'journal' ? 'PDF, EPUB, DOC' : formData.resource_type === 'video' ? 'MP4, WebM' : 'MP3, WAV'})
                </label>
                <input
                  ref={resourceInputRef}
                  type="file"
                  accept={getAcceptedFileTypes(formData.resource_type)}
                  onChange={handleResourceUpload}
                  className="hidden"
                />
                {formData.resource_url ? (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700 flex-1 truncate">
                      {formData.resource_url.split('/').pop()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, resource_url: "" })}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => resourceInputRef.current?.click()}
                    disabled={isUploadingResource}
                    className="w-full border-dashed"
                  >
                    {isUploadingResource ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload className="w-4 h-4 mr-2" /> Upload Resource File</>
                    )}
                  </Button>
                )}
                <p className="text-xs text-gray-500 mt-1">Max file size: 100MB</p>
              </div>

              {/* Or enter URL manually */}
              <div className="text-center text-sm text-gray-500">— or enter URLs manually —</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cover URL</label>
                  <Input
                    value={formData.cover_url}
                    onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Resource URL</label>
                  <Input
                    value={formData.resource_url}
                    onChange={(e) => setFormData({ ...formData, resource_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="is_published" className="text-sm">Published (visible to public)</label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || isUploadingCover || isUploadingResource}
                  className="flex-1 border-2 border-black"
                  style={{ backgroundColor: '#0000CD', color: 'white' }}
                >
                  {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingResource ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#0000CD] mx-auto" />
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No resources yet. Add your first resource to get started.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.resource_type);
                return (
                  <TableRow key={resource.id}>
                    <TableCell>
                      <div 
                        className="w-8 h-8 rounded flex items-center justify-center"
                        style={{ backgroundColor: '#0000CD' }}
                      >
                        <TypeIcon className="w-4 h-4 text-[#FFD700]" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{resource.title}</TableCell>
                    <TableCell>{resource.author}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
                        {resource.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => togglePublishMutation.mutate({ 
                          id: resource.id, 
                          is_published: !resource.is_published 
                        })}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          resource.is_published 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {resource.is_published ? (
                          <><Eye className="w-3 h-3" /> Published</>
                        ) : (
                          <><EyeOff className="w-3 h-3" /> Draft</>
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(resource)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this resource?")) {
                              deleteMutation.mutate(resource.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-700"
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