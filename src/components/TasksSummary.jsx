import { useEffect, useState } from "react";
import { ArrowRight, Clock, AlertTriangle, User } from "lucide-react";
import { useSelector } from "react-redux";

export default function TasksSummary() {

    const { currentWorkspace } = useSelector((state) => state.workspace);
    const user = { id: 'user_1' }
    const [tasks, setTasks] = useState([]);

    // Get all tasks for all projects in current workspace
    useEffect(() => {
        if (currentWorkspace) {
            setTasks(currentWorkspace.projects.flatMap((project) => project.tasks));
        }
    }, [currentWorkspace]);

    const myTasks = tasks.filter(i => i.assigneeId === user.id);
    const overdueTasks = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'DONE');
    const inProgressIssues = tasks.filter(i => i.status === 'IN_PROGRESS');

    const summaryCards = [
        {
            title: "My Tasks",
            count: myTasks.length,
            icon: User,
            color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
            items: myTasks.slice(0, 3)
        },
        {
            title: "Overdue",
            count: overdueTasks.length,
            icon: AlertTriangle,
            color: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
            items: overdueTasks.slice(0, 3)
        },
        {
            title: "In Progress",
            count: inProgressIssues.length,
            icon: Clock,
            color: "bg-blue-100 text-blue-800 dark:bg-indigo-500/15 dark:text-indigo-400",
            items: inProgressIssues.slice(0, 3)
        }
    ];

    return (
        <div className="space-y-6">
            {summaryCards.map((card) => (
                <div key={card.title} className="bg-theme-card border border-theme-border rounded-xl overflow-hidden transition-all duration-200">
                    <div className="border-b border-theme-border p-4 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-50 dark:bg-theme-card/[0.06] rounded-lg">
                                <card.icon className="w-4 h-4 text-theme-text-sub" />
                            </div>
                            <div className="flex items-center justify-between flex-1">
                                <h3 className="text-sm font-medium text-theme-text">{card.title}</h3>
                                <span className={`inline-block mt-1 px-2 py-1 rounded-md text-xs font-semibold ${card.color}`}>
                                    {card.count}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        {card.items.length === 0 ? (
                            <p className="text-sm text-theme-text-sub text-center py-4">
                                No {card.title.toLowerCase()}
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {card.items.map((issue) => (
                                    <div key={issue.id} className="p-3 rounded-lg bg-theme-surface hover:bg-theme-surface dark:hover:bg-theme-surface transition-colors duration-200 cursor-pointer">
                                        <h4 className="text-sm font-medium text-theme-text truncate">
                                            {issue.title}
                                        </h4>
                                        <p className="text-xs text-gray-600 text-theme-text-sub capitalize mt-1">
                                            {issue.type} • {issue.priority} priority
                                        </p>
                                    </div>
                                ))}
                                {card.count > 3 && (
                                    <button className="flex items-center justify-center w-full text-sm text-theme-text-sub hover:text-gray-800 dark:hover:text-white/70 mt-2 transition-colors duration-200">
                                        View {card.count - 3} more <ArrowRight className="w-3 h-3 ml-2" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
