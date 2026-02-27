import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'react-toastify';
import { getDashboardStats } from '../../services/ordersApi';

interface Stats {
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  totalRevenue: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => toast.error('Failed to load dashboard stats'))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
      { label: 'Total Orders', value: stats.totalOrders.toString() },
      { label: 'Total Customers', value: stats.totalCustomers.toString() },
      { label: 'Active Products', value: stats.totalProducts.toString() },
      {
        label: 'Revenue',
        value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      },
    ]
    : [
      { label: 'Total Orders', value: '—' },
      { label: 'Total Customers', value: '—' },
      { label: 'Active Products', value: '—' },
      { label: 'Revenue', value: '—' },
    ];

  return (
    <AdminLayout>
      <h2 className="text-xl md:text-2xl font-semibold mb-5">Overview</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow min-h-[96px] flex flex-col justify-center"
          >
            <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">
              {loading ? (
                <span className="inline-block w-16 h-6 bg-gray-100 animate-pulse rounded" />
              ) : (
                stat.value
              )}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}