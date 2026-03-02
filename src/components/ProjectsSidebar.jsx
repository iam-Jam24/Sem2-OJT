import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRightIcon, SettingsIcon, KanbanIcon, ChartColumnIcon, CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { useSelector } from 'react-redux';

const ProjectSidebar = () => {

    const location = useLocation();

    const [expandedProjects, setExpandedProjects] = useState(new Set());
    const [searchParams] = useSearchParams();

    const projects = useSelector(
        (state) => state?.workspace?.currentWorkspace?.projects || []
    );

    const getProjectSubItems = (projectId) => [
        { title: 'Tasks', icon: KanbanIcon, url: `/projectsDetail?id=${projectId}&tab=tasks` },
        { title: 'Analytics', icon: ChartColumnIcon, url: `/projectsDetail?id=${projectId}&tab=analytics` },
        { title: 'Calendar', icon: CalendarIcon, url: `/projectsDetail?id=${projectId}&tab=calendar` },
        { title: 'Settings', icon: SettingsIcon, url: `/projectsDetail?id=${projectId}&tab=settings` }
    ];

    const toggleProject = (id) => {
        const newSet = new Set(expandedProjects);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        setExpandedProjects(newSet);
    };

    return (
        <div className="mt-6 px-3">
            <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-xs font-medium text-theme-text-sub uppercase tracking-wider">
                    Projects
                </h3>
                <Link to="/projects">
                    <button className="size-5 text-theme-text-sub hover:text-gray-900 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-theme-card/[0.06] rounded flex items-center justify-center transition-colors duration-200">
                        <ArrowRightIcon className="size-3" />
                    </button>
                </Link>
            </div>

            <div className="space-y-1 px-3">
                {projects.map((project) => (
                    <div key={project.id}>
                        <button onClick={() => toggleProject(project.id)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 text-theme-text-sub hover:bg-gray-100 dark:hover:bg-theme-card/[0.04] hover:text-gray-900 dark:hover:text-white/90" >
                            <ChevronRightIcon className={`size-3 text-theme-text-sub transition-transform duration-200 ${expandedProjects.has(project.id) && 'rotate-90'}`} />
                            <div className="size-2 rounded-full bg-indigo-500" />
                            <span className="truncate max-w-40 text-sm">{project.name}</span>
                        </button>

                        {expandedProjects.has(project.id) && (
                            <div className="ml-5 mt-1 space-y-1">
                                {getProjectSubItems(project.id).map((subItem) => {
                                    // checking if the current path matches the sub-item's URL
                                    const isActive =
                                        location.pathname === `/projectsDetail` &&
                                        searchParams.get('id') === project.id &&
                                        searchParams.get('tab') === subItem.title.toLowerCase();

                                    return (
                                        <Link key={subItem.title} to={subItem.url} className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors duration-200 text-xs ${isActive ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/15' : 'text-gray-600 text-theme-text-sub hover:text-gray-900 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-theme-card/[0.04]'}`} >
                                            <subItem.icon className="size-3" />
                                            {subItem.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectSidebar;