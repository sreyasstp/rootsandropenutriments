import AdminLayout from "../../components/AdminLayout";

const stats = [
  { label: "Total Orders", value: "124" },
  { label: "Total Customers", value: "89" },
  { label: "Products", value: "32" },
  { label: "Revenue", value: "₹1,24,500" },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow"
          >
            <p className="text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
