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
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2,
  Award,
  ExternalLink,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

interface Endorsement {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface EndorsementFormData {
  name: string;
  acronym: string;
  logo_url: string;
  website_url: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

const emptyFormData: EndorsementFormData = {
  name: "",
  acronym: "",
  logo_url: "",
  website_url: "",
  description: "",
  display_order: 0,
  is_active: true,
};

export const EndorsementsAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Endorsement | null>(null);
  const [formData, setFormData] = useState<EndorsementFormData>(emptyFormData);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: endorsements = [], isLoading } = useQuery({
    queryKey: ['endorsements-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('endorsements')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Endorsement[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: EndorsementFormData) => {
      const payload = {
        name: data.name,
        acronym: data.acronym || null,
        logo_url: data.logo_url,
        website_url: data.website_url || null,
        description: data.description || null,
        display_order: data.display_order,
        is_active: data.is_active,
      };
      const { error } = await supabase
        .from('endorsements')
        .insert([payload]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endorsements-admin'] });
      queryClient.invalidateQueries({ queryKey: ['endorsements'] });
      toast.success("Endorsement created successfully");
      setIsDialogOpen(false);
      setFormData(emptyFormData);
    },
    onError: (error) => {
      toast.error("Failed to create endorsement: " + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EndorsementFormData }) => {
      const payload = {
        name: data.name,
        acronym: data.acronym || null,
        logo_url: data.logo_url,
        website_url: data.website_url || null,
        description: data.description || null,
        display_order: data.display_order,
        is_active: data.is_active,
      };
      const { error } = await supabase
        .from('endorsements')
        .update(payload)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endorsements-admin'] });
      queryClient.invalidateQueries({ queryKey: ['endorsements'] });
      toast.success("Endorsement updated successfully");
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData(emptyFormData);
    },
    onError: (error) => {
      toast.error("Failed to update endorsement: " + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('endorsements')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endorsements-admin'] });
      queryClient.invalidateQueries({ queryKey: ['endorsements'] });
      toast.success("Endorsement deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete endorsement: " + error.message);
    }
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `endorsement-${Date.now()}.${fileExt}`;
      const filePath = `endorsements/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('elibrary')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('elibrary')
        .getPublicUrl(filePath);

      setFormData({ ...formData, logo_url: publicUrl });
      toast.success("Logo uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload logo: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenDialog = (item?: Endorsement) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        acronym: item.acronym || "",
        logo_url: item.logo_url,
        website_url: item.website_url || "",
        description: item.description || "",
        display_order: item.display_order ?? 0,
        is_active: item.is_active ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData(emptyFormData);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Organization name is required");
      return;
    }
    if (!formData.logo_url.trim()) {
      toast.error("Logo URL is required");
      return;
    }
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Award className="w-6 h-6" />
            Endorsements Management
          </h2>
          <p className="text-muted-foreground">Manage partner organizations that endorse SCEF</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Endorsement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-primary">
                {editingItem ? "Edit Endorsement" : "Add New Endorsement"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Organization Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Civil Society Action Coalition on Education For All"
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Acronym</label>
                  <Input
                    value={formData.acronym}
                    onChange={(e) => setFormData({ ...formData, acronym: e.target.value })}
                    placeholder="e.g. CSACEFA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Logo *</label>
                <div className="space-y-2">
                  {formData.logo_url && (
                    <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <img 
                        src={formData.logo_url} 
                        alt="Logo preview" 
                        className="w-16 h-16 object-contain rounded border bg-white"
                      />
                      <span className="text-sm text-muted-foreground flex-1 truncate">
                        {formData.logo_url}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      value={formData.logo_url}
                      onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                      placeholder="Logo URL or upload below"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload a logo (max 2MB) or paste an external URL
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Website URL</label>
                <Input
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://organization.org"
                  type="url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the organization..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Lower = appears first</p>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="is_active" className="text-sm">
                    Active (visible on website)
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingItem ? "Update Endorsement" : "Create Endorsement"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : endorsements.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <Award className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No endorsements found</p>
          <Button onClick={() => handleOpenDialog()} className="mt-4">
            <Plus className="w-4 h-4 mr-2" /> Add First Endorsement
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Order</TableHead>
                <TableHead className="w-20">Logo</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endorsements.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <span className="font-mono text-sm">{item.display_order}</span>
                  </TableCell>
                  <TableCell>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white border">
                      <img 
                        src={item.logo_url} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.acronym || item.name}</p>
                      {item.acronym && (
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {item.name}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.website_url ? (
                      <a 
                        href={item.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.is_active ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenDialog(item)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this endorsement?")) {
                            deleteMutation.mutate(item.id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
