import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Home, User, Zap } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", Icon: Home, ocid: "nav-dashboard" },
  { to: "/drill", label: "Drill", Icon: Zap, ocid: "nav-drill" },
  { to: "/saved", label: "Saved", Icon: Bookmark, ocid: "nav-saved" },
  { to: "/profile", label: "Profile", Icon: User, ocid: "nav-profile" },
] as const;

export function BottomNav() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-4 py-3 rounded-[28px] neomorph-raised bg-card flex items-center gap-1"
      data-ocid="bottom-nav"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ to, label, Icon, ocid }) => {
        const isActive =
          pathname === to || (to !== "/" && pathname.startsWith(to));
        return (
          <Link
            key={to}
            to={to}
            data-ocid={ocid}
            aria-label={label}
            className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-[18px] transition-smooth min-w-[56px]"
          >
            <span
              className="w-10 h-10 flex items-center justify-center rounded-[14px] transition-smooth"
              style={
                isActive
                  ? {
                      background: "#2DB2ED",
                      boxShadow:
                        "inset -2px -2px 5px rgba(255,255,255,0.3), inset 2px 2px 5px rgba(0,0,0,0.15)",
                    }
                  : {}
              }
            >
              <Icon
                size={20}
                className={isActive ? "text-white" : "nav-icon-inactive"}
                style={isActive ? { color: "#fff" } : { color: "#8A8A8A" }}
              />
            </span>
            <span
              className="text-[10px] font-medium transition-smooth"
              style={{ color: isActive ? "#2DB2ED" : "#8A8A8A" }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
