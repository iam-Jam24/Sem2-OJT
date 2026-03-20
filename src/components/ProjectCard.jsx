import { Link } from "react-router-dom";

const statusColors = {
    PLANNING: "bg-theme-surface bg-theme-surface text-theme-text/70",
    ACTIVE: "bg-emerald-200 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-400",
    ON_HOLD: "bg-amber-200 dark:bg-amber-500/20 text-amber-900 dark:text-amber-400",
    COMPLETED: "bg-blue-200 dark:bg-blue-500/20 text-blue-900 dark:text-blue-400",
    CANCELLED: "bg-red-200 dark:bg-red-500/20 text-red-900 dark:text-red-400",
};

const ProjectCard = ({ project }) => {
    return (
        <Link to={`/projectsDetail?id=${project.id}&tab=tasks`} className="bg-theme-card border border-theme-border rounded-xl p-5 transition-all duration-200 group hover:scale-[1.02]">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-theme-text mb-1 truncate group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors">
                        {project.name}
                    </h3>
                    <p className="text-theme-text-sub text-sm line-clamp-2 mb-3">
                        {project.description || "No description"}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-0.5 rounded-md text-xs ${statusColors[project.status]}`} >
                    {project.status.replace("_", " ")}
                </span>
                <span className="text-xs text-theme-text-sub capitalize">
                    {project.priority} priority
                </span>
            </div>

            {/* Progress */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-theme-text-sub">Progress</span>
                    <span className="text-theme-text-sub text-theme-text-sub">{project.progress || 0}%</span>
                </div>
                <div className="w-full bg-theme-surface dark:bg-theme-card/[0.06] h-1.5 rounded">
                    <div className="h-1.5 rounded bg-blue-500 dark:bg-indigo-500 dark:shadow-[0_0_8px_rgba(99,102,241,0.4)]" style={{ width: `${project.progress || 0}%` }} />
                </div>
            </div>

            </Link>
    );
};

export default ProjectCard;

// ugxd3f
