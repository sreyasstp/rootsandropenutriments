import AdminLayout from "../../components/AdminLayout";

const mockCustomers = [
  {
    id: "CUS-001",
    name: "Rahul Nair",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    orders: 5,
    joined: "12 Feb 2026",
  },
  {
    id: "CUS-002",
    name: "Anita Krishnan",
    email: "anita@example.com",
    phone: "+91 9123456789",
    orders: 2,
    joined: "10 Feb 2026",
  },
];

export default function Customers() {
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-semibold">
          Customers
        </h2>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {mockCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {customer.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {customer.email}
                </p>
                <p className="text-xs text-gray-500">
                  {customer.phone}
                </p>
              </div>

              <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                {customer.orders} Orders
              </span>
            </div>

            <div className="mt-3 text-xs text-gray-400">
              Joined {customer.joined}
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-700">
            <tr>
              <th className="px-5 py-3 text-left">Customer</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Phone</th>
              <th className="px-5 py-3 text-left">Orders</th>
              <th className="px-5 py-3 text-left">Joined</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium">
                  {customer.name}
                </td>
                <td className="px-5 py-4">
                  {customer.email}
                </td>
                <td className="px-5 py-4">
                  {customer.phone}
                </td>
                <td className="px-5 py-4">
                  {customer.orders}
                </td>
                <td className="px-5 py-4 text-gray-500">
                  {customer.joined}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {mockCustomers.length === 0 && (
        <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
          No customers found
        </div>
      )}
    </AdminLayout>
  );
}