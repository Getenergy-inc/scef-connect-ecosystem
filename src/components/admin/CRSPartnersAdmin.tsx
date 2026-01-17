import { useState, useRef } from "react";
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
import { Plus, Pencil, Trash2, ExternalLink, Upload, Loader2, FileSpreadsheet, Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mapAdminErrorToUserMessage } from "@/lib/errorMapper";
import { validateLogoFile } from "@/lib/fileValidation";
import { logger } from "@/lib/logger";

interface CRSPartner {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
  service_description: string;
  service_category: string | null;
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

interface BulkImportRow {
  name: string;
  acronym?: string;
  logo_url: string;
  website_url?: string;
  service_description: string;
  service_category?: string;
  partner_since: number;
  description?: string;
  display_order?: number;
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
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<CRSPartner | null>(null);
  const [formData, setFormData] = useState<PartnerFormData>(defaultFormData);
  const [uploading, setUploading] = useState(false);
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkPreview, setBulkPreview] = useState<BulkImportRow[]>([]);
  const [bulkErrors, setBulkErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      logger.error("Error saving partner:", error);
      toast.error(mapAdminErrorToUserMessage("save partner", error));
    },
  });

  const bulkImportMutation = useMutation({
    mutationFn: async (rows: BulkImportRow[]) => {
      const insertData = rows.map(row => ({
        name: row.name,
        acronym: row.acronym || null,
        logo_url: row.logo_url,
        website_url: row.website_url || null,
        service_description: row.service_description,
        service_category: row.service_category || "operations",
        partner_since: row.partner_since,
        description: row.description || null,
        display_order: row.display_order || 0,
        is_active: true,
      }));

      const { error } = await supabase.from("crs_partners").insert(insertData);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crs-partners-admin"] });
      queryClient.invalidateQueries({ queryKey: ["crs-partners"] });
      toast.success(`${bulkPreview.length} partners imported successfully`);
      resetBulkImport();
    },
    onError: (error) => {
      logger.error("Error importing partners:", error);
      toast.error(mapAdminErrorToUserMessage("import partners", error));
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
      logger.error("Error deleting partner:", error);
      toast.error(mapAdminErrorToUserMessage("delete partner", error));
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use centralized file validation
    const validation = validateLogoFile(file);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `crs-partners/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("elibrary")
      .upload(fileName, file);

    if (uploadError) {
      logger.error("Upload failed:", uploadError);
      toast.error("Upload failed. Please try again.");
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

  const parseCSV = (text: string): { rows: BulkImportRow[]; errors: string[] } => {
    const lines = text.split('\n').filter(line => line.trim());
    const errors: string[] = [];
    const rows: BulkImportRow[] = [];

    if (lines.length < 2) {
      errors.push("CSV must have a header row and at least one data row");
      return { rows, errors };
    }

    const headerLine = lines[0].toLowerCase();
    const headers = headerLine.split(',').map(h => h.trim().replace(/"/g, ''));
    
    const requiredHeaders = ['name', 'logo_url', 'service_description', 'partner_since'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      errors.push(`Missing required columns: ${missingHeaders.join(', ')}`);
      return { rows, errors };
    }

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      
      if (values.length !== headers.length) {
        errors.push(`Row ${i + 1}: Column count mismatch`);
        continue;
      }

      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      if (!row.name || !row.logo_url || !row.service_description || !row.partner_since) {
        errors.push(`Row ${i + 1}: Missing required fields`);
        continue;
      }

      const partnerSince = parseInt(row.partner_since);
      if (isNaN(partnerSince) || partnerSince < 1990 || partnerSince > new Date().getFullYear()) {
        errors.push(`Row ${i + 1}: Invalid partner_since year`);
        continue;
      }

      rows.push({
        name: row.name,
        acronym: row.acronym,
        logo_url: row.logo_url,
        website_url: row.website_url,
        service_description: row.service_description,
        service_category: row.service_category,
        partner_since: partnerSince,
        description: row.description,
        display_order: row.display_order ? parseInt(row.display_order) : 0,
      });
    }

    return { rows, errors };
  };

  const handleBulkFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a CSV file");
      return;
    }

    setBulkImporting(true);
    const text = await file.text();
    const { rows, errors } = parseCSV(text);
    
    setBulkPreview(rows);
    setBulkErrors(errors);
    setBulkImporting(false);
  };

  const downloadTemplate = () => {
    const headers = ['name', 'acronym', 'logo_url', 'website_url', 'service_description', 'service_category', 'partner_since', 'description', 'display_order'];
    const exampleRow = ['Example Corp', 'EC', 'https://example.com/logo.png', 'https://example.com', 'IT Support', 'technology', '2023', 'Description here', '0'];
    
    const csv = [headers.join(','), exampleRow.join(',')].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crs_partners_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setEditingPartner(null);
    setIsDialogOpen(false);
  };

  const resetBulkImport = () => {
    setBulkPreview([]);
    setBulkErrors([]);
    setIsBulkDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openEdit = (partner: CRSPartner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      acronym: partner.acronym || "",
      logo_url: partner.logo_url,
      website_url: partner.website_url || "",
      service_description: partner.service_description,
      service_category: partner.service_category || "operations",
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

  const handleBulkImport = () => {
    if (bulkPreview.length === 0) {
      toast.error("No valid rows to import");
      return;
    }
    bulkImportMutation.mutate(bulkPreview);
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">CRS Partners</h2>
          <p className="text-muted-foreground">Manage Corporate Responsibility Support partners</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Bulk Import Dialog */}
          <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => { resetBulkImport(); setIsBulkDialogOpen(true); }}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Bulk Import
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Bulk Import Partners</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={downloadTemplate}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Download a CSV template with the correct format
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Upload CSV File</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleBulkFileUpload}
                    disabled={bulkImporting}
                  />
                  <p className="text-xs text-muted-foreground">
                    Required columns: name, logo_url, service_description, partner_since
                  </p>
                </div>

                {bulkErrors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Import Errors</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        {bulkErrors.map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {bulkPreview.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Preview ({bulkPreview.length} partners to import)</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-muted sticky top-0">
                            <tr>
                              <th className="text-left p-2">Name</th>
                              <th className="text-left p-2">Service</th>
                              <th className="text-left p-2">Category</th>
                              <th className="text-left p-2">Since</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bulkPreview.map((row, i) => (
                              <tr key={i} className="border-t">
                                <td className="p-2">{row.name}</td>
                                <td className="p-2 truncate max-w-[150px]">{row.service_description}</td>
                                <td className="p-2">{row.service_category || "operations"}</td>
                                <td className="p-2">{row.partner_since}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetBulkImport} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleBulkImport} 
                    disabled={bulkPreview.length === 0 || bulkImportMutation.isPending}
                    className="flex-1"
                  >
                    {bulkImportMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>Import {bulkPreview.length} Partners</>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Partner Dialog */}
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
