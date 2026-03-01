import { SearchIcon, PanelLeft } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { assets } from '../assets/assets'

const Navbar = ({ setIsSidebarOpen }) => {

    const dispatch = useDispatch();

    return (
        <div className="w-full bg-theme-surface px-6 xl:px-16 py-3 flex-shrink-0 border-b border-theme-border">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                {/* Left section */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Sidebar Trigger */}
                    <button onClick={() => setIsSidebarOpen((prev) => !prev)} className="sm:hidden p-2 rounded-lg transition-colors text-theme-text-sub hover:bg-theme-card hover:text-theme-text" >
                        <PanelLeft size={20} />
                    </button>

                    {/* Search Input */}
                    <div className="relative flex-1 max-w-sm">
                        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-text-sub size-3.5" />
                        <input
                            type="text"
                            placeholder="Search projects, tasks..."
                            className="pl-8 pr-4 py-2 w-full bg-theme-card border border-theme-border rounded-lg text-sm text-theme-text placeholder-theme-text-sub transition focus:border-theme-accent focus:outline-none"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">

                    {/* User Button */}
                    <img src={assets.profile_img_a} alt="User Avatar" className="size-7 rounded-full ring-2 ring-white/10" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
