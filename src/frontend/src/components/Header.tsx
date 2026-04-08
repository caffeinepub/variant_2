import { Bell, Menu } from "lucide-react";

export function Header() {
  return (
    <header
      className="w-full bg-card flex items-center justify-between px-5 py-4 sticky top-0 z-30"
      style={{ boxShadow: "0 2px 8px #babecc66" }}
    >
      {/* Hamburger */}
      <button
        type="button"
        aria-label="Open menu"
        className="w-10 h-10 flex items-center justify-center rounded-[14px] neomorph-raised transition-smooth active:neomorph-sunken"
        onClick={() => {}}
        data-ocid="header-menu-btn"
      >
        <Menu size={20} className="text-foreground" />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 select-none">
        <div
          className="w-8 h-8 rounded-[10px] flex items-center justify-center neomorph-raised"
          style={{ background: "#2DB2ED" }}
          aria-hidden="true"
        >
          <span className="text-white font-bold text-lg leading-none">V</span>
        </div>
        <span className="font-display font-bold text-[1.35rem] tracking-tight text-foreground">
          Variant
        </span>
      </div>

      {/* Bell */}
      <button
        type="button"
        aria-label="Notifications"
        className="w-10 h-10 flex items-center justify-center rounded-full neomorph-raised transition-smooth active:neomorph-sunken"
        onClick={() => {}}
        data-ocid="header-bell-btn"
      >
        <Bell size={18} className="text-foreground" />
      </button>
    </header>
  );
}
