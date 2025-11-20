import { LayoutDashboard, Vote, PenTool, BadgeCheck, Bookmark, LogOut} from "lucide-react";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"

    }, 
    {
        id: "02",
        label: "Create Poll",
        icon: Vote,
        path: "/create-poll"

    },
    {
        id: "03", 
        label: "My Polls",
        icon: PenTool,
        path: "/my-polls"

    },  
    {
        id: "04",
        label: "Voted Polls",
        icon: BadgeCheck,
        path: "/voted-polls"

    },
    {
        id: "05",
        label: "Bookmarks",
        icon: Bookmark,
        path: "/bookmarked-polls"

    }, 
    {
        id: "06",
        label: "Logout",
        icon: LogOut,
        path: "logout"

    }, 
]
export const POLL_TYPE = [
    { id: "01", label: "yes/no", value:"yes/no"},
    { id: "02", label: "Single Choise", value:"single-choice"},
    { id: "03", label: "Rating", value:"rating"},
    { id: "04", label: "Image Based", value:"image-based"},
    { id: "05", label: "Open ended", value:"open-ended"},
]