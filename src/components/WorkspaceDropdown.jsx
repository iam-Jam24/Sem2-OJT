import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkspace } from "../features/workspaceSlice";
import { useNavigate } from "react-router-dom";
import { dummyWorkspaces } from "../assets/assets";

function WorkspaceDropdown() {

    const { workspaces } = useSelector((state) => state.workspace);
    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSelectWorkspace = (organizationId) => {
        dispatch(setCurrentWorkspace(organizationId))
        setIsOpen(false);
        navigate('/')
    }

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative m-4" ref={dropdownRef}>
            <button onClick={() => setIsOpen(prev => !prev)} className="w-full flex items-center justify-between p-3 h-auto text-left rounded-lg hover:bg-gray-100 dark:hover:bg-theme-card/[0.04] transition-all duration-200" >
                <div className="flex items-center gap-3">
                    <img src={currentWorkspace?.image_url} alt={currentWorkspace?.name} className="w-8 h-8 rounded shadow dark:shadow-lg dark:shadow-black/20" />
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-theme-text text-sm truncate">
                            {currentWorkspace?.name || "Select Workspace"}
                        </p>
                        <p className="text-xs text-theme-text-sub truncate">
                            {workspaces.length} workspace{workspaces.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
                <ChevronDown className="w-4 h-4 text-theme-text-sub flex-shrink-0" />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-64 bg-theme-card border border-theme-border rounded-xl shadow-lg dark:shadow-2xl top-full left-0 border border-gray-200 dark:border-white/[0.08]">
                    <div className="p-2">
                        <p className="text-xs text-theme-text-sub uppercase tracking-wider mb-2 px-2">
                            Workspaces
                        </p>
                        {dummyWorkspaces.map((ws) => (
                            <div key={ws.id} onClick={() => onSelectWorkspace(ws.id)} className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-theme-card/[0.06] transition-all duration-200" >
                                <img src={ws.image_url} alt={ws.name} className="w-6 h-6 rounded" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-theme-text truncate">
                                        {ws.name}
                                    </p>
                                    <p className="text-xs text-theme-text-sub truncate">
                                        {ws.membersCount || 0} members
                                    </p>
                                </div>
                                {currentWorkspace?.id === ws.id && (
                                    <Check className="w-4 h-4 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                                )}
                            </div>
                        ))}
                    </div>

                    <hr className="border-theme-border" />

                    <div className="p-2 cursor-pointer rounded-lg group hover:bg-gray-100 dark:hover:bg-theme-card/[0.06] transition-all duration-200" >
                        <p className="flex items-center text-xs gap-2 my-1 w-full text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300">
                            <Plus className="w-4 h-4" /> Create Workspace
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkspaceDropdown;
