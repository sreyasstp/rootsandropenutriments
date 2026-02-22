import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Topbar({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <header className="bg-white px-4 md:px-6 py-4 flex justify-between items-center border-b border-[#e3dccb]">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-semibold text-lg">
          Admin Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded text-sm"
      >
        Logout
      </button>
    </header>
  );
}