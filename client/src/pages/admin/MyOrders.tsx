import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, MapPin, DollarSign, ChevronRight, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';

interface OrderSummary {
    id: string;
    order_status: string;
    payment_status: string;
    total_amount: number;
    shipping_name: string;
    shipping_city: string;
    created_at: string;
    item_count: number;
}

export function MyOrdersPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        const fetchOrders = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('order_summary')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (fetchError) throw fetchError;
                setOrders(data || []);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching orders:', err);
                setError('Failed to load orders');
                toast.error('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'shipped':
                return 'bg-blue-100 text-blue-700';
            case 'processing':
                return 'bg-yellow-100 text-yellow-700';
            case 'confirmed':
                return 'bg-purple-100 text-purple-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'text-green-600';
            case 'unpaid':
                return 'text-yellow-600';
            case 'failed':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (!user) return null;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f2ecdc]/30 py-12 mt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#004606] mb-2">My Orders</h1>
                    <p className="text-gray-600">Track and manage all your orders</p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="bg-white rounded-2xl border p-12 text-center">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#004606] rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-500">Loading your orders…</p>
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="bg-white rounded-2xl border p-6 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Error Loading Orders</h3>
                            <p className="text-sm text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-sm text-[#004606] font-medium hover:underline"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : orders.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-2xl border p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                        <p className="text-gray-500 mb-6">You haven't placed any orders. Start shopping now!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-block bg-[#004606] hover:bg-[#006609] text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    /* Orders List */
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                onClick={() => navigate(`/order-detail/${order.id}`)}
                                className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.order_status)}`}>
                                                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                                </span>
                                                <span className={`text-xs font-semibold ${getPaymentStatusColor(order.payment_status)}`}>
                                                    {order.payment_status === 'paid' ? '✓ ' : ''}
                                                    {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                                        {/* Date */}
                                        <div className="flex items-start gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-500">Order Date</p>
                                                <p className="text-sm font-semibold text-gray-900">{formatDate(order.created_at)}</p>
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="flex items-start gap-2">
                                            <Package className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-500">Items</p>
                                                <p className="text-sm font-semibold text-gray-900">{order.item_count}</p>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-500">Delivery To</p>
                                                <p className="text-sm font-semibold text-gray-900 truncate">{order.shipping_city}</p>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="flex items-start gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-500">Total</p>
                                                <p className="text-sm font-semibold text-[#004606]">₹{order.total_amount.toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recipient Name */}
                                    <p className="text-sm text-gray-600">
                                        Recipient: <span className="font-medium text-gray-900">{order.shipping_name}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}