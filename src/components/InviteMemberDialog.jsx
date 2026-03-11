import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";

const InviteMemberDialog = ({ isDialogOpen, setIsDialogOpen }) => {

    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        role: "org:member",
    });

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
                        <UserPlus className="size-5 text-theme-text" /> Invite Team Member
                    </h2>
                    {currentWorkspace && (
                        <p className="text-sm text-theme-text-sub">
                            Inviting to workspace: <span className="text-indigo-600 dark:text-indigo-400">{currentWorkspace.name}</span>
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
                            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email address" className="pl-10 mt-1 w-full rounded-lg bg-theme-surface border-theme-border border border-zinc-300 text-theme-text text-sm py-2 focus:outline-none" required />
                        </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-theme-text/70">Role</label>
                        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full rounded-lg bg-theme-surface border-theme-border border border-zinc-300 text-theme-text py-2 px-3 mt-1 focus:outline-none text-sm" >
                            <option value="org:member">Member</option>
                            <option value="org:admin">Admin</option>
                        </select>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setIsDialogOpen(false)} className="px-5 py-2 rounded-lg text-sm border border-zinc-300 bg-theme-card border-theme-border hover:brightness-110 text-zinc-900 transition-colors duration-200" >
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting || !currentWorkspace} className="px-5 py-2 rounded-lg text-sm bg-theme-accent text-white hover:opacity-90 disabled:opacity-50 transition" >
                            {isSubmitting ? "Sending..." : "Send Invitation"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteMemberDialog;
