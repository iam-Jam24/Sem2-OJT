import { useEffect, useState } from "react";
import { GitCommit, MessageSquare, Clock, Bug, Zap, Square } from "lucide-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const typeIcons = {
    BUG: { icon: Bug, color: "text-red-500 dark:text-red-400" },
    FEATURE: { icon: Zap, color: "text-blue-500 dark:text-blue-400" },
    TASK: { icon: Square, color: "text-green-500 dark:text-green-400" },
    IMPROVEMENT: { icon: MessageSquare, color: "text-amber-500 dark:text-amber-400" },
    OTHER: { icon: GitCommit, color: "text-purple-500 dark:text-purple-400" },
};

const statusColors = {
    TODO: "bg-theme-surface text-zinc-800 bg-theme-surface text-theme-text-sub",
    IN_PROGRESS: "bg-amber-200 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
    DONE: "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400",
};

const RecentActivity = () => {
    const [tasks, setTasks] = useState([]);
    const { currentWorkspace } = useSelector((state) => state.workspace);

    const getTasksFromCurrentWorkspace = () => {

        if (!currentWorkspace) return;

        const tasks = currentWorkspace.projects.flatMap((project) => project.tasks.map((task) => task));
        setTasks(tasks);
    };

    useEffect(() => {
        getTasksFromCurrentWorkspace();
    }, [currentWorkspace]);

    return (
        <div className="bg-theme-card border border-theme-border rounded-xl overflow-hidden transition-all duration-200">
            <div className="border-b border-theme-border p-4">
                <h2 className="text-lg text-theme-text">Recent Activity</h2>
            </div>

            <div className="p-0">
                {tasks.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-theme-surface dark:bg-theme-card/[0.06] rounded-full flex items-center justify-center">
                            <Clock className="w-8 h-8 text-theme-text-sub" />
                        </div>
                        <p className="text-theme-text-sub">No recent activity</p>
                    </div>
                ) : (
                    <div className="divide-y divide-zinc-200 dark:divide-white/[0.04]">
                        {tasks.map((task) => {
                            const TypeIcon = typeIcons[task.type]?.icon || Square;
                            const iconColor = typeIcons[task.type]?.color || "text-theme-text-sub";

                            return (
                                <div key={task.id} className="p-6 hover:bg-zinc-50 dark:hover:bg-theme-surface transition-colors duration-200">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-theme-surface dark:bg-theme-card/[0.06] rounded-lg">
                                            <TypeIcon className={`w-4 h-4 ${iconColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-theme-text/90 truncate">
                                                    {task.title}
                                                </h4>
                                                <span className={`ml-2 px-2 py-1 rounded-md text-xs ${statusColors[task.status] || "bg-theme-surface text-zinc-700 dark:bg-theme-surface dark:text-theme-text-sub"}`}>
                                                    {task.status.replace("_", " ")}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-zinc-500 text-theme-text-sub">
                                                <span className="capitalize">{task.type.toLowerCase()}</span>
                                                {task.assignee && (
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-4 h-4 bg-theme-surface dark:bg-theme-surface rounded-full flex items-center justify-center text-[10px] text-theme-text-sub">
                                                            {task.assignee.name[0].toUpperCase()}
                                                        </div>
                                                        {task.assignee.name}
                                                    </div>
                                                )}
                                                <span>
                                                    {format(new Date(task.updatedAt), "MMM d, h:mm a")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
