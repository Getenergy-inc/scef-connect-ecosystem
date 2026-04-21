import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { StaffGuard } from "@/components/staff/StaffGuard";
import { StaffLayout } from "@/components/staff/StaffLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2, Sparkles } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  due_date: string | null;
  due_time: string | null;
  task_type: string;
  ai_generated: boolean | null;
}

interface Props { taskType?: "daily" | "weekly" | "monthly"; pageTitle: string; }

const PlannerInner = ({ taskType = "daily", pageTitle }: Props) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [aiBusy, setAiBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUserId(session?.user?.id ?? null));
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchTasks();
  }, [userId, taskType]);

  const fetchTasks = async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("staff_tasks")
      .select("*")
      .eq("user_id", userId)
      .eq("task_type", taskType)
      .order("status")
      .order("priority", { ascending: false })
      .order("due_date");
    setTasks((data as Task[] | null) ?? []);
  };

  const addTask = async () => {
    if (!userId || !newTitle.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await supabase.from("staff_tasks").insert({
      user_id: userId,
      title: newTitle.trim(),
      priority: newPriority,
      task_type: taskType,
      status: "todo",
      due_date: taskType === "daily" ? today : null,
    });
    if (error) { toast.error("Could not add task"); return; }
    setNewTitle("");
    fetchTasks();
  };

  const toggleDone = async (task: Task) => {
    const next = task.status === "done" ? "todo" : "done";
    await supabase.from("staff_tasks").update({
      status: next,
      completed_at: next === "done" ? new Date().toISOString() : null,
    }).eq("id", task.id);
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await supabase.from("staff_tasks").delete().eq("id", id);
    fetchTasks();
  };

  const aiSuggest = async () => {
    if (!userId) return;
    setAiBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("staff-ai-assistant", {
        body: {
          tool: taskType === "daily" ? "daily_planner" : taskType === "weekly" ? "weekly_planner" : "monthly_planner",
          context: { existing_tasks: tasks.map((t) => t.title), date: new Date().toISOString() },
        },
      });
      if (error) throw error;
      const suggestions: string[] = data?.suggestions ?? [];
      if (suggestions.length === 0) { toast.info("No suggestions returned"); return; }
      const today = new Date().toISOString().slice(0, 10);
      const { error: insErr } = await supabase.from("staff_tasks").insert(
        suggestions.map((title) => ({
          user_id: userId,
          title,
          priority: "medium",
          task_type: taskType,
          status: "todo",
          due_date: taskType === "daily" ? today : null,
          ai_generated: true,
        }))
      );
      if (insErr) throw insErr;
      toast.success(`${suggestions.length} AI tasks added — edit before sending`);
      fetchTasks();
    } catch (e: any) {
      toast.error(e?.message?.includes("402") ? "AI credits required" : "AI suggestion failed");
    } finally {
      setAiBusy(false);
    }
  };

  return (
    <StaffLayout title={pageTitle}>
      <Helmet><title>{pageTitle} | SCEF Staff</title></Helmet>

      <div className="max-w-3xl space-y-5">
        <Card>
          <CardContent className="pt-5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder={`Add a ${taskType} task…`}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="flex-1"
              />
              <Select value={newPriority} onValueChange={setNewPriority}>
                <SelectTrigger className="sm:w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addTask}><Plus className="w-4 h-4 mr-1" />Add</Button>
            </div>
            <Button variant="outline" size="sm" onClick={aiSuggest} disabled={aiBusy} className="w-full sm:w-auto">
              <Sparkles className="w-4 h-4 mr-1" />
              {aiBusy ? "Generating…" : `Suggest ${taskType} tasks with AI`}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {tasks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No {taskType} tasks yet.</p>
          )}
          {tasks.map((t) => (
            <Card key={t.id} className={t.status === "done" ? "opacity-60" : ""}>
              <CardContent className="py-3 flex items-center gap-3">
                <Checkbox checked={t.status === "done"} onCheckedChange={() => toggleDone(t)} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${t.status === "done" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {t.title}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <Badge variant="outline" className="text-[10px]">{t.priority}</Badge>
                    {t.due_date && <Badge variant="outline" className="text-[10px]">{t.due_date}</Badge>}
                    {t.ai_generated && <Badge variant="secondary" className="text-[10px]"><Sparkles className="w-3 h-3 mr-1" />AI</Badge>}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(t.id)}>
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StaffLayout>
  );
};

export const StaffPlanner = (props: Props) => (
  <StaffGuard><PlannerInner {...props} /></StaffGuard>
);
