import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { format } from "date-fns";
import { mapAdminErrorToUserMessage } from "@/lib/errorMapper";
import { logger } from "@/lib/logger";

interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string | null;
  employment_type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary_range: string | null;
  application_email: string | null;
  application_deadline: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
}

interface VacancyFormData {
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_range: string;
  application_email: string;
  application_deadline: string;
  is_active: boolean;
  is_featured: boolean;
}

const emptyForm: VacancyFormData = {
  title: "",
  department: "",
  location: "",
  employment_type: "full-time",
  description: "",
  requirements: "",
  responsibilities: "",
  salary_range: "",
  application_email: "hr@santoscreations.org",
  application_deadline: "",
  is_active: true,
  is_featured: false,
};

const departments = [
  "Executive Office",
  "Programs",
  "Media & Communications",
  "Technology",
  "Finance & Administration",
  "Human Resources",
  "Chapter Services",
  "Partnership & Business Development",
];

const employmentTypes = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "volunteer", label: "Volunteer" },
];

export const VacanciesAdmin = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState<VacancyFormData>(emptyForm);

  // Fetch all vacancies (including inactive for admin)
  const { data: vacancies, isLoading } = useQuery({
    queryKey: ["admin-vacancies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vacancies")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Vacancy[];
    },
  });

  // Create vacancy mutation
  const createMutation = useMutation({
    mutationFn: async (data: VacancyFormData) => {
      const { error } = await supabase.from("vacancies").insert({
        title: data.title,
        department: data.department,
        location: data.location || null,
        employment_type: data.employment_type,
        description: data.description,
        requirements: data.requirements.split("\n").filter(r => r.trim()),
        responsibilities: data.responsibilities.split("\n").filter(r => r.trim()),
        salary_range: data.salary_range || null,
        application_email: data.application_email || null,
        application_deadline: data.application_deadline || null,
        is_active: data.is_active,
        is_featured: data.is_featured,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-vacancies"] });
      toast.success("Vacancy created successfully");
      resetForm();
    },
    onError: (error) => {
      logger.error("Failed to create vacancy:", error);
      toast.error(mapAdminErrorToUserMessage("create vacancy", error));
    },
  });

  // Update vacancy mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: VacancyFormData }) => {
      const { error } = await supabase
        .from("vacancies")
        .update({
          title: data.title,
          department: data.department,
          location: data.location || null,
          employment_type: data.employment_type,
          description: data.description,
          requirements: data.requirements.split("\n").filter(r => r.trim()),
          responsibilities: data.responsibilities.split("\n").filter(r => r.trim()),
          salary_range: data.salary_range || null,
          application_email: data.application_email || null,
          application_deadline: data.application_deadline || null,
          is_active: data.is_active,
          is_featured: data.is_featured,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-vacancies"] });
      toast.success("Vacancy updated successfully");
      resetForm();
    },
    onError: (error) => {
      logger.error("Failed to update vacancy:", error);
      toast.error(mapAdminErrorToUserMessage("update vacancy", error));
    },
  });

  // Delete vacancy mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("vacancies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-vacancies"] });
      toast.success("Vacancy deleted successfully");
    },
    onError: (error) => {
      logger.error("Failed to delete vacancy:", error);
      toast.error(mapAdminErrorToUserMessage("delete vacancy", error));
    },
  });

  // Toggle active status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("vacancies")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-vacancies"] });
      toast.success("Status updated");
    },
    onError: (error) => {
      logger.error("Failed to update status:", error);
      toast.error(mapAdminErrorToUserMessage("update status", error));
    },
  });

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingVacancy(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setFormData({
      title: vacancy.title,
      department: vacancy.department,
      location: vacancy.location || "",
      employment_type: vacancy.employment_type,
      description: vacancy.description,
      requirements: vacancy.requirements.join("\n"),
      responsibilities: vacancy.responsibilities.join("\n"),
      salary_range: vacancy.salary_range || "",
      application_email: vacancy.application_email || "",
      application_deadline: vacancy.application_deadline || "",
      is_active: vacancy.is_active,
      is_featured: vacancy.is_featured,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVacancy) {
      updateMutation.mutate({ id: editingVacancy.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Vacancies Management</h2>
          <p className="text-muted-foreground">Manage job listings and career opportunities</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingVacancy(null); setFormData(emptyForm); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Vacancy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVacancy ? "Edit Vacancy" : "Create New Vacancy"}</DialogTitle>
              <DialogDescription>
                {editingVacancy ? "Update the job listing details" : "Add a new job listing to the careers page"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Program Coordinator"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type *</Label>
                  <Select
                    value={formData.employment_type}
                    onValueChange={(value) => setFormData({ ...formData, employment_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Lagos, Nigeria / Remote"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the role and its objectives..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Bachelor's degree in relevant field&#10;3+ years experience&#10;Strong communication skills"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                  <Textarea
                    id="responsibilities"
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    placeholder="Coordinate program activities&#10;Manage stakeholder relationships&#10;Prepare reports"
                    rows={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary_range">Salary Range</Label>
                  <Input
                    id="salary_range"
                    value={formData.salary_range}
                    onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                    placeholder="e.g. $30,000 - $45,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application_email">Application Email</Label>
                  <Input
                    id="application_email"
                    type="email"
                    value={formData.application_email}
                    onChange={(e) => setFormData({ ...formData, application_email: e.target.value })}
                    placeholder="hr@santoscreations.org"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application_deadline">Application Deadline</Label>
                  <Input
                    id="application_deadline"
                    type="date"
                    value={formData.application_deadline}
                    onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active (visible on site)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingVacancy ? "Update Vacancy" : "Create Vacancy"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{vacancies?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total Vacancies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-forest" />
              <div>
                <p className="text-2xl font-bold">{vacancies?.filter(v => v.is_active).length || 0}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <div>
                <p className="text-2xl font-bold">{vacancies?.filter(v => v.is_featured).length || 0}</p>
                <p className="text-sm text-muted-foreground">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{vacancies?.filter(v => !v.is_active).length || 0}</p>
                <p className="text-sm text-muted-foreground">Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vacancies List */}
      <Card>
        <CardHeader>
          <CardTitle>All Vacancies</CardTitle>
          <CardDescription>Manage job listings across all departments</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading vacancies...</div>
          ) : vacancies && vacancies.length > 0 ? (
            <div className="space-y-4">
              {vacancies.map((vacancy) => (
                <div
                  key={vacancy.id}
                  className={`p-4 rounded-lg border ${vacancy.is_featured ? 'border-gold bg-gold/5' : 'border-border'} ${!vacancy.is_active ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{vacancy.title}</h3>
                        {vacancy.is_featured && <Badge className="bg-gold text-earth text-xs">Featured</Badge>}
                        {!vacancy.is_active && <Badge variant="outline" className="text-xs">Inactive</Badge>}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {vacancy.department}
                        </span>
                        {vacancy.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {vacancy.location}
                          </span>
                        )}
                        <Badge variant="outline">
                          {employmentTypes.find(t => t.value === vacancy.employment_type)?.label || vacancy.employment_type}
                        </Badge>
                        {vacancy.application_deadline && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Deadline: {format(new Date(vacancy.application_deadline), "MMM d, yyyy")}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {vacancy.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={vacancy.is_active}
                        onCheckedChange={(checked) => toggleActiveMutation.mutate({ id: vacancy.id, is_active: checked })}
                      />
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(vacancy)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this vacancy?")) {
                            deleteMutation.mutate(vacancy.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="font-semibold text-foreground mb-1">No Vacancies</h3>
              <p className="text-muted-foreground mb-4">Create your first job listing to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Vacancy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
