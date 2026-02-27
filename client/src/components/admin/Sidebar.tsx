import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Customers", path: "/admin/customers" },
  // { name: "Settings", path: "/admin/settings" }
];

export default function Sidebar({
  mobile = false,
  onSelect,
}: {
  mobile?: boolean;
  onSelect?: () => void;
}) {
  return (
    <aside
      className={`
        w-64
        min-h-screen
        bg-[#f2ecdc]
        text-[#004606]
        border-r border-[#e3dccb]
        flex flex-col
        flex-shrink-0
        ${mobile ? "" : "hidden md:flex"}
      `}
    >
      {/* LOGO */}
      <div className="flex items-center justify-center px-4 py-6 border-b border-[#e3dccb]">
        <img
          src="/roots_logo.jpg"
          alt="Roots & Rope Nutriment"
          className="h-14 object-contain"
        />
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onSelect}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                ? "bg-[#004606] text-white shadow-sm"
                : "hover:bg-[#e9e2cf]"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}