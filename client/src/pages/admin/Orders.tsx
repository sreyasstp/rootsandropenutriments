import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getOrders,
  updateOrderStatus,
  Order,
  OrderStatus,
} from '../../services/ordersApi';
import { toast } from 'react-toastify';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  refunded: 'bg-gray-100 text-gray-600',
};

const ORDER_STATUSES: OrderStatus[] = [
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded',
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, order_status: status } : o))
      );
      toast.success('Order status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });

  const customerName = (order: Order) =>
    order.users?.name ?? order.shipping_name ?? 'Unknown';

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl md:text-2xl font-semibold">Orders</h2>
        <span className="text-sm text-gray-500">{orders.length} total</span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading orders…</div>
      ) : orders.length === 0 ? (
        <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
          No orders found
        </div>
      ) : (
        <>
          {/* MOBILE */}
          <div className="space-y-4 md:hidden">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-sm">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">{customerName(order)}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium h-fit ${STATUS_COLORS[order.order_status]}`}>
                    {order.order_status}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-medium">
                    ₹{Number(order.total_amount).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(order.created_at)}</span>
                </div>

                <div className="mt-3">
                  <select
                    value={order.order_status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    className="w-full border rounded-lg px-2 py-1.5 text-xs"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Expand items */}
                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="mt-2 text-xs text-[#004606] font-medium"
                >
                  {expandedId === order.id ? 'Hide items' : `View items (${order.order_items?.length ?? 0})`}
                </button>

                {expandedId === order.id && order.order_items && (
                  <div className="mt-3 space-y-1 border-t pt-2">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs text-gray-600">
                        <span>{item.product_name} ({item.pack_size}{item.unit}) ×{item.quantity}</span>
                        <span>₹{item.subtotal}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b text-gray-700">
                <tr>
                  <th className="px-5 py-3 text-left">Order ID</th>
                  <th className="px-5 py-3 text-left">Customer</th>
                  <th className="px-5 py-3 text-left">Amount</th>
                  <th className="px-5 py-3 text-left">Payment</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <>
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    >
                      <td className="px-5 py-4 font-mono font-medium text-xs">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{customerName(order)}</p>
                        <p className="text-xs text-gray-400">{order.users?.email}</p>
                      </td>
                      <td className="px-5 py-4 font-medium">
                        ₹{Number(order.total_amount).toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.order_status]}`}>
                          {order.order_status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.order_status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className="border rounded-lg px-2 py-1 text-xs"
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    {/* Expanded order items row */}
                    {expandedId === order.id && order.order_items && (
                      <tr key={`${order.id}-items`} className="bg-gray-50">
                        <td colSpan={7} className="px-5 py-3">
                          <p className="text-xs font-semibold text-gray-500 mb-2">Order Items</p>
                          <div className="space-y-1">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex justify-between text-xs text-gray-700 max-w-xl">
                                <span>{item.product_name} — {item.pack_size}{item.unit} × {item.quantity}</span>
                                <span className="font-medium">₹{item.subtotal}</span>
                              </div>
                            ))}
                          </div>
                          {order.shipping_address && (
                            <p className="text-xs text-gray-400 mt-2">
                              📍 {order.shipping_address}, {order.shipping_city}, {order.shipping_pincode}
                            </p>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
}