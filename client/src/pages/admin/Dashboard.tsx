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
      <h2 className="text-xl md:text-2xl font-semibold mb-5">
        Overview
      </h2>

      <div className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-4
        gap-4
        md:gap-6
      ">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              bg-white
              rounded-xl
              border border-gray-100
              p-4 md:p-6
              shadow-sm
              hover:shadow-md
              transition-shadow
              min-h-[96px]
              flex flex-col justify-center
            "
          >
            <p className="text-xs md:text-sm text-gray-500">
              {stat.label}
            </p>
            <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}