import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardList, Users, MessageSquare, Clock, 
  CheckCircle, Calendar, TrendingUp, UserCheck
} from "lucide-react";

interface VolunteerDashboardProps {
  profile: any;
  user: any;
}

export const VolunteerDashboard = ({ profile, user }: VolunteerDashboardProps) => {
  const stats = [
    { label: "Tasks Assigned", value: "0", icon: ClipboardList, color: "text-primary" },
    { label: "Tasks Completed", value: "0", icon: CheckCircle, color: "text-forest" },
    { label: "Hours Logged", value: "0h", icon: Clock, color: "text-gold" },
    { label: "Team Members", value: "0", icon: Users, color: "text-terracotta" },
  ];

  const assignedTasks = [
    // Placeholder - will be populated from database
  ];

  const upcomingEvents = [
    // Placeholder - will be populated from database
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-forest to-forest/90 rounded-2xl p-6 text-cream">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="w-6 h-6" />
              <span className="text-sm font-medium">Volunteer</span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-1">
              Hello, {profile?.first_name || "Volunteer"}!
            </h2>
            <p className="text-cream/80">
              Thank you for your dedication to SCEF's mission.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link to="/dashboard/sign-in">
              <Clock className="w-4 h-4 mr-2" />
              Clock In
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                My Tasks
              </CardTitle>
              <CardDescription>Tasks assigned to you</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/tasks">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {assignedTasks.length > 0 ? (
              <div className="space-y-3">
                {assignedTasks.map((task: any) => (
                  <div key={task.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{task.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'high' ? 'bg-terracotta/10 text-terracotta' :
                        task.priority === 'medium' ? 'bg-gold/10 text-gold' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Due: {task.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No tasks assigned</p>
                <p className="text-sm">Check back later for new assignments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Chat */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Team Chat
              </CardTitle>
              <CardDescription>Connect with your team</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/messages">Open Chat</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">Team chat coming soon</p>
              <p className="text-sm">Stay connected with your volunteer team</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Monthly Progress
          </CardTitle>
          <CardDescription>Your volunteer activity this month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Hours Logged</span>
              <span className="text-muted-foreground">0 / 20 hours</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Tasks Completed</span>
              <span className="text-muted-foreground">0 / 5 tasks</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Attendance Rate</span>
              <span className="text-muted-foreground">0%</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/tasks">
            <ClipboardList className="w-5 h-5" />
            <span>My Tasks</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/team">
            <Users className="w-5 h-5" />
            <span>My Team</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/messages">
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/progress">
            <TrendingUp className="w-5 h-5" />
            <span>My Progress</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
