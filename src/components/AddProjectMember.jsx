import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const AddProjectMember = ({ isDialogOpen, setIsDialogOpen }) => {

    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');

    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);

    const project = currentWorkspace?.projects.find((p) => p.id === id);
    const projectMembersEmails = project?.members.map((member) => member.user.email);

    const [email, setEmail] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    };

    if (!isDialogOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-theme-card border border-theme-border rounded-2xl p-6 w-full max-w-md text-theme-text shadow-2xl">
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <UserPlus className="size-5 text-theme-text" /> Add Member to Project
                    </h2>
                    {currentWorkspace && (
                        <p className="text-sm text-theme-text-sub">
                            Adding to Project: <span className="text-indigo-600 dark:text-indigo-400">{project.name}</span>
                        </p>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-theme-text/70">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-theme-text-sub w-4 h-4" />
                            {/* List All non project members from current workspace */}
                            <select value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 mt-1 w-full rounded-lg bg-theme-surface border-theme-border border border-zinc-300 text-theme-text text-sm py-2 focus:outline-none" required >
                                <option value="">Select a member</option>
                                {currentWorkspace?.members
                                    .filter((member) => !projectMembersEmails.includes(member.user.email))
                                    .map((member) => (
                                        <option key={member.user.id} value={member.user.email}> {member.user.email} </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setIsDialogOpen(false)} className="px-5 py-2 text-sm rounded-lg border border-zinc-300 bg-theme-card border-theme-border hover:brightness-110 text-zinc-900 transition-colors duration-200" >
                            Cancel
                        </button>
                        <button type="submit" disabled={isAdding || !currentWorkspace} className="px-5 py-2 text-sm rounded-lg bg-theme-accent text-white hover:opacity-90 disabled:opacity-50 transition" >
                            {isAdding ? "Adding..." : "Add Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectMember;
