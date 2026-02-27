import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'react-toastify';
import { Customer, getCustomers } from '../../services/customersApi';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch(() => toast.error('Failed to load customers'))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl md:text-2xl font-semibold">Customers</h2>
        <span className="text-sm text-gray-500">{customers.length} total</span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading customers…</div>
      ) : customers.length === 0 ? (
        <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
          No customers found
        </div>
      ) : (
        <>
          {/* MOBILE */}
          <div className="space-y-4 md:hidden">
            {customers.map((c) => (
              <div key={c.id} className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {c.picture ? (
                      <img src={c.picture} alt={c.name ?? ''} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#004606]/10 flex items-center justify-center text-[#004606] font-bold text-sm">
                        {(c.name ?? c.email ?? '?')[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{c.name ?? '—'}</h3>
                      <p className="text-xs text-gray-500">{c.email}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                    {c.order_count ?? 0} Orders
                  </span>
                </div>
                <div className="mt-3 flex justify-between text-xs text-gray-400">
                  <span className="capitalize">{c.provider}</span>
                  <span>Joined {formatDate(c.created_at)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b text-gray-700">
                <tr>
                  <th className="px-5 py-3 text-left">Customer</th>
                  <th className="px-5 py-3 text-left">Email</th>
                  <th className="px-5 py-3 text-left">Provider</th>
                  <th className="px-5 py-3 text-left">Orders</th>
                  <th className="px-5 py-3 text-left">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {c.picture ? (
                          <img src={c.picture} alt={c.name ?? ''} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#004606]/10 flex items-center justify-center text-[#004606] font-bold text-xs">
                            {(c.name ?? c.email ?? '?')[0].toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium">{c.name ?? '—'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{c.email}</td>
                    <td className="px-5 py-4">
                      <span className="capitalize px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                        {c.provider}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium">{c.order_count ?? 0}</td>
                    <td className="px-5 py-4 text-gray-500">{formatDate(c.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
}