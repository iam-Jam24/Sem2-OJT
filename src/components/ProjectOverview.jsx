import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, UsersIcon, FolderOpen } from "lucide-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import CreateProjectDialog from "./CreateProjectDialog";

const ProjectOverview = () => {
    const statusColors = {
        PLANNING: "bg-theme-surface text-zinc-800 bg-theme-surface text-theme-text-sub",
        ACTIVE: "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400",
        ON_HOLD: "bg-amber-200 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
        COMPLETED: "bg-blue-200 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400",
        CANCELLED: "bg-red-200 text-red-800 dark:bg-red-500/20 dark:text-red-400"
    };

    const priorityColors = {
        LOW: "border-zinc-300 text-zinc-600 dark:border-white/20 text-theme-text-sub",
        MEDIUM: "border-amber-300 text-amber-700 dark:border-amber-500/40 dark:text-amber-400",
        HIGH: "border-green-300 text-green-700 dark:border-green-500/40 dark:text-green-400",
    };

    const currentWorkspace = useSelector((state) => state?.workspace?.currentWorkspace || null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(currentWorkspace?.projects || []);
    }, [currentWorkspace]);

    return currentWorkspace && (
        <div className="bg-theme-card border border-theme-border rounded-xl overflow-hidden transition-all duration-200">
            <div className="border-b border-theme-border p-4 flex items-center justify-between">
                <h2 className="text-md text-theme-text">Project Overview</h2>
                <Link to={'/projects'} className="text-sm text-zinc-600 hover:text-theme-text-sub dark:hover:text-white/70 flex items-center transition-colors duration-200">
                    View all <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </div>

            <div className="p-0">
                {projects.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-theme-surface text-zinc-600 dark:bg-theme-card/[0.06] text-theme-text-sub rounded-full flex items-center justify-center">
                            <FolderOpen size={32} />
                        </div>
                        <p className="text-theme-text-sub">No projects yet</p>
                        <button onClick={() => setIsDialogOpen(true)} className="mt-4 px-4 py-2 text-sm bg-theme-accent text-white hover:opacity-90 rounded-lg hover:opacity-90 transition">
                            Create your First Project
                        </button>
                        <CreateProjectDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
                    </div>
                ) : (
                    <div className="divide-y divide-zinc-200 dark:divide-white/[0.04]">
                        {projects.slice(0, 5).map((project) => (
                            <Link key={project.id} to={`/projectsDetail?id=${project.id}&tab=tasks`} className="block p-6 hover:bg-zinc-50 dark:hover:bg-theme-surface transition-colors duration-200">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-theme-text/90 mb-1">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm text-zinc-600 text-theme-text-sub line-clamp-2">
                                            {project.description || 'No description'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <span className={`text-xs px-2 py-1 rounded-md ${statusColors[project.status]}`}>
                                            {project.status.replace('_', ' ').replaceAll(/\b\w/g, c => c.toUpperCase())}
                                        </span>
                                        <div className={`w-2 h-2 rounded-full border-2 ${priorityColors[project.priority]}`} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-zinc-500 text-theme-text-sub mb-3">
                                    <div className="flex items-center gap-4">
                                        {project.members?.length > 0 && (
                                            <div className="flex items-center gap-1">
                                                <UsersIcon className="w-3 h-3" />
                                                {project.members.length} members
                                            </div>
                                        )}
                                        {project.end_date && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {format(new Date(project.end_date), "MMM d, yyyy")}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-zinc-500 text-theme-text-sub">Progress</span>
                                        <span className="text-zinc-600 text-theme-text-sub">{project.progress || 0}%</span>
                                    </div>
                                    <div className="w-full bg-theme-surface rounded h-1.5">
                                        <div className="h-1.5 bg-blue-500 dark:bg-indigo-500 rounded dark:shadow-[0_0_8px_rgba(99,102,241,0.4)]" style={{ width: `${project.progress || 0}%` }} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectOverview;
