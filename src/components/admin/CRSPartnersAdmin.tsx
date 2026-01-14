import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ExternalLink, Upload, Loader2 } from "lucide-react";

interface CRSPartner {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
  service_description: string;
  partner_since: number;
  description: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

interface PartnerFormData {
  name: string;
  acronym: string;
  logo_url: string;
  website_url: string;
  service_description: string;
  service_category: string;
  partner_since: number;
  description: string;
  display_order: number;
  is_active: boolean;
}

// Expanded service categories
const serviceCategories = [
  { value: "operations", label: "Operations & Administration" },
  { value: "energy", label: "Energy Trading Services" },
  { value: "technology", label: "Technology & IT Services" },
  { value: "logistics", label: "Logistics & Supply Chain" },
  { value: "legal", label: "Legal & Compliance" },
  { value: "finance", label: "Financial Services" },
  { value: "marketing", label: "Marketing & Communications" },
  { value: "hr", label: "Human Resources" },
  { value: "consulting", label: "Consulting & Advisory" },
  { value: "facilities", label: "Facilities Management" },
  { value: "security", label: "Security Services" },
  { value: "other", label: "Other Services" },
];

const defaultFormData: PartnerFormData = {
  name: "",
  acronym: "",
  logo_url: "",
  website_url: "",
  service_description: "",
  service_category: "operations",
  partner_since: new Date().getFullYear(),
  description: "",
  display_order: 0,
  is_active: true,
};

export const CRSPartnersAdmin = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<CRSPartner | null>(null);
  const [formData, setFormData] = useState<PartnerFormData>(defaultFormData);
  const [uploading, setUploading] = useState(false);

  const { data: partners, isLoading } = useQuery({
    queryKey: ["crs-partners-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crs_partners")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as CRSPartner[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: PartnerFormData) => {
      if (editingPartner) {
        const { error } = await supabase
          .from("crs_partners")
          .update(data)
          .eq("id", editingPartner.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("crs_partners").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crs-partners-admin"] });
      queryClient.invalidateQueries({ queryKey: ["crs-partners"] });
      toast.success(editingPartner ? "Partner updated" : "Partner added");
      resetForm();
    },
    onError: (error) => {
      toast.error("Error saving partner: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("crs_partners").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crs-partners-admin"] });
      queryClient.invalidateQueries({ queryKey: ["crs-partners"] });
      toast.success("Partner deleted");
    },
    onError: (error) => {
      toast.error("Error deleting partner: " + error.message);
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `crs-partners/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("elibrary")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("elibrary")
      .getPublicUrl(fileName);

    setFormData({ ...formData, logo_url: publicUrl.publicUrl });
    setUploading(false);
    toast.success("Logo uploaded");
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setEditingPartner(null);
    setIsDialogOpen(false);
  };

  const openEdit = (partner: CRSPartner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      acronym: partner.acronym || "",
      logo_url: partner.logo_url,
      website_url: partner.website_url || "",
      service_description: partner.service_description,
      service_category: "operations", // Default category for existing partners
      partner_since: partner.partner_since,
      description: partner.description || "",
      display_order: partner.display_order || 0,
      is_active: partner.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.logo_url || !formData.service_description) {
      toast.error("Please fill required fields");
      return;
    }
    saveMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">CRS Partners</h2>
          <p className="text-muted-foreground">Manage Corporate Responsibility Support partners</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPartner ? "Edit Partner" : "Add Partner"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Company Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="acronym">Acronym</Label>
                <Input
                  id="acronym"
                  value={formData.acronym}
                  onChange={(e) => setFormData({ ...formData, acronym: e.target.value })}
                  placeholder="e.g., PKIS"
                />
              </div>

              <div className="space-y-2">
                <Label>Logo *</Label>
                <div className="flex items-center gap-4">
                  {formData.logo_url && (
                    <img
                      src={formData.logo_url}
                      alt="Logo preview"
                      className="w-16 h-16 object-contain border rounded"
                    />
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      disabled={uploading}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Label
                      htmlFor="logo-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/80"
                    >
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? "Uploading..." : "Upload Logo"}
                    </Label>
                  </div>
                </div>
                <Input
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  placeholder="Or enter URL directly"
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Service Category *</Label>
                <select
                  id="category"
                  value={formData.service_category}
                  onChange={(e) => setFormData({ ...formData, service_category: e.target.value })}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  {serviceCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service Description *</Label>
                <Input
                  id="service"
                  value={formData.service_description}
                  onChange={(e) => setFormData({ ...formData, service_description: e.target.value })}
                  placeholder="e.g., Operations & Administration"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="since">Partner Since (Year) *</Label>
                <Input
                  id="since"
                  type="number"
                  min="1990"
                  max={new Date().getFullYear()}
                  value={formData.partner_since}
                  onChange={(e) => setFormData({ ...formData, partner_since: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about the partnership"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={saveMutation.isPending} className="flex-1">
                  {saveMutation.isPending ? "Saving..." : editingPartner ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {partners?.map((partner) => (
          <Card key={partner.id} className={!partner.is_active ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="w-12 h-12 object-contain bg-white rounded border"
                  />
                  <div>
                    <CardTitle className="text-base">
                      {partner.acronym || partner.name}
                    </CardTitle>
                    {partner.acronym && (
                      <p className="text-xs text-muted-foreground">{partner.name}</p>
                    )}
                  </div>
                </div>
                {!partner.is_active && (
                  <span className="text-xs bg-muted px-2 py-1 rounded">Inactive</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Service:</span> {partner.service_description}</p>
                <p><span className="text-muted-foreground">Since:</span> {partner.partner_since}</p>
              </div>
              {partner.website_url && (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  Website
                </a>
              )}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(partner)}>
                  <Pencil className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Delete this partner?")) {
                      deleteMutation.mutate(partner.id);
                    }
                  }}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {partners?.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No CRS partners yet. Add your first partner above.
        </div>
      )}
    </div>
  );
};
