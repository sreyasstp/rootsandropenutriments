import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full">
            <Sidebar mobile onSelect={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setOpen(true)} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}