import AdminLayout from "../../components/admin/AdminLayout";

const mockOrders = [
  {
    id: "ORD-1001",
    customer: "Rahul N",
    amount: "₹1,240",
    status: "Pending",
    date: "21 Feb 2026",
  },
  {
    id: "ORD-1002",
    customer: "Anita K",
    amount: "₹2,890",
    status: "Delivered",
    date: "20 Feb 2026",
  },
];

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function Orders() {
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl md:text-2xl font-semibold">Orders</h2>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-xs text-gray-500">
                  {order.customer}
                </p>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm font-medium">
                {order.amount}
              </span>
              <span className="text-xs text-gray-400">
                {order.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-700">
            <tr>
              <th className="px-5 py-3 text-left">Order ID</th>
              <th className="px-5 py-3 text-left">Customer</th>
              <th className="px-5 py-3 text-left">Amount</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium">
                  {order.id}
                </td>
                <td className="px-5 py-4">
                  {order.customer}
                </td>
                <td className="px-5 py-4 font-medium">
                  {order.amount}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE (future) */}
      {mockOrders.length === 0 && (
        <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
          No orders found
        </div>
      )}
    </AdminLayout>
  );
}