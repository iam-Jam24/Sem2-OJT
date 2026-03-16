import { useState } from "react";
import { format, isSameDay, isBefore, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { CalendarIcon, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";

const typeColors = {
    BUG: "bg-red-200 text-red-800 dark:bg-red-500/20 dark:text-red-400",
    FEATURE: "bg-blue-200 text-blue-800 dark:bg-indigo-500/20 dark:text-indigo-400",
    TASK: "bg-green-200 text-green-800 dark:bg-emerald-500/20 dark:text-emerald-400",
    IMPROVEMENT: "bg-purple-200 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400",
    OTHER: "bg-amber-200 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
};

const priorityBorders = {
    LOW: "border-zinc-300 dark:border-zinc-600",
    MEDIUM: "border-amber-300 dark:border-amber-500",
    HIGH: "border-orange-300 dark:border-orange-500",
};

const ProjectCalendar = ({ tasks }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    const getTasksForDate = (date) => tasks.filter((task) => isSameDay(task.due_date, date));

    const upcomingTasks = tasks
        .filter((task) => task.due_date && !isBefore(task.due_date, today) && task.status !== "DONE")
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        .slice(0, 5);

    const overdueTasks = tasks.filter((task) => task.due_date && isBefore(task.due_date, today) && task.status !== "DONE");

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });


    const handleMonthChange = (direction) => {
        setCurrentMonth((prev) => (direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)));
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar View */}
            <div className="lg:col-span-2 ">
                <div className="not-dark:bg-theme-card border border-theme-border rounded-xl border border-theme-border p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-theme-text text-md flex gap-2 items-center max-sm:hidden">
                            <CalendarIcon className="size-5" /> Task Calendar
                        </h2>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => handleMonthChange("prev")}>
                                <ChevronLeft className="size-5 text-theme-text-sub hover:text-zinc-900 dark:hover:text-white/90 transition-colors duration-200" />
                            </button>
                            <span className="text-theme-text">{format(currentMonth, "MMMM yyyy")}</span>
                            <button onClick={() => handleMonthChange("next")}>
                                <ChevronRight className="size-5 text-theme-text-sub hover:text-zinc-900 dark:hover:text-white/90 transition-colors duration-200" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 text-xs text-theme-text-sub mb-2 text-center">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {daysInMonth.map((day) => {
                            const dayTasks = getTasksForDate(day);
                            const isSelected = isSameDay(day, selectedDate);
                            const hasOverdue = dayTasks.some((t) => t.status !== "DONE" && isBefore(t.due_date, today));

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(day)}
                                    className={`sm:h-14 rounded-lg flex flex-col items-center justify-center text-sm transition-all duration-200
                                    ${isSelected ? "bg-indigo-200 text-indigo-900 dark:bg-indigo-500/25 dark:text-indigo-300" : "bg-zinc-50 text-zinc-900 dark:bg-theme-card/[0.03] text-theme-text-sub hover:bg-theme-surface dark:hover:bg-theme-card/[0.06]"}
                                    ${hasOverdue ? "border border-red-300 dark:border-red-500/40" : ""}`}
                                >
                                    <span>{format(day, "d")}</span>
                                    {dayTasks.length > 0 && (
                                        <span className="text-[10px] text-blue-700 dark:text-blue-400">{dayTasks.length} tasks</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tasks for Selected Day */}
                {getTasksForDate(selectedDate).length > 0 && (
                    <div className="not-dark:bg-theme-card mt-6 bg-theme-card border border-theme-border rounded-xl border border-theme-border p-4">
                        <h3 className="text-theme-text text-lg mb-3">
                            Tasks for {format(selectedDate, "MMM d, yyyy")}
                        </h3>
                        <div className="space-y-3">
                            {getTasksForDate(selectedDate).map((task) => (
                                <div
                                    key={task.id}
                                    className={`bg-zinc-50 dark:bg-theme-card/[0.04] hover:bg-theme-surface dark:hover:bg-theme-card/[0.07] transition-colors duration-200 p-4 rounded-lg border-l-4 ${priorityBorders[task.priority]}`}
                                >
                                    <div className="flex justify-between mb-2">
                                        <h4 className="text-theme-text font-medium">{task.title}</h4>
                                        <span className={`px-2 py-0.5 rounded text-xs ${typeColors[task.type]}`}>
                                            {task.type}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs text-theme-text-sub">
                                        <span className="capitalize">{task.priority.toLowerCase()} priority</span>
                                        {task.assignee && (
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {task.assignee.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* Upcoming Tasks */}
                <div className="bg-theme-card border border-theme-border rounded-xl border border-theme-border p-4">
                    <h3 className="text-theme-text text-sm flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4" /> Upcoming Tasks
                    </h3>
                    {upcomingTasks.length === 0 ? (
                        <p className="text-theme-text-sub text-sm text-center">No upcoming tasks</p>
                    ) : (
                        <div className="space-y-2">
                            {upcomingTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-zinc-50 dark:bg-theme-card/[0.04] hover:bg-theme-surface dark:hover:bg-theme-card/[0.07] p-3 rounded-lg transition-colors duration-200"
                                >
                                    <div className="flex justify-between items-start text-sm">
                                        <span className="text-theme-text">{task.title}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded ${typeColors[task.type]}`}>
                                            {task.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-theme-text-sub">{format(task.due_date, "MMM d")}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Overdue Tasks */}
                {overdueTasks.length > 0 && (
                    <div className="bg-theme-card border border-theme-border rounded-xl border border-red-300 dark:border-red-500/30 border-l-4 p-4">
                        <h3 className="text-red-700 dark:text-red-400 text-sm flex items-center gap-2 mb-3">
                            <Clock className="w-4 h-4" /> Overdue Tasks ({overdueTasks.length})
                        </h3>
                        <div className="space-y-2">
                            {overdueTasks.slice(0, 5).map((task) => (
                                <div key={task.id} className="bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/15 p-3 rounded-lg transition-colors duration-200" >
                                    <div className="flex justify-between text-sm text-theme-text">
                                        <span>{task.title}</span>
                                        <span className="text-xs px-2 py-0.5 rounded bg-red-200 dark:bg-red-500/20 text-red-900 dark:text-red-400">
                                            {task.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-red-600 dark:text-red-300">
                                        Due {format(task.due_date, "MMM d")}
                                    </p>
                                </div>
                            ))}
                            {overdueTasks.length > 5 && (
                                <p className="text-xs text-theme-text-sub text-center">
                                    +{overdueTasks.length - 5} more
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCalendar;
