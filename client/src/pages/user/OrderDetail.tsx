import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import {
    Package,
    MapPin,
    Calendar,
    DollarSign,
    Phone,
    User,
    ChevronLeft,
    AlertCircle,
    Truck,
    CheckCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

interface OrderDetail {
    id: string;
    order_status: string;
    payment_status: string;
    total_amount: number;
    shipping_name: string;
    shipping_phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_state: string;
    shipping_pincode: string;
    notes: string;
    created_at: string;
    updated_at: string;
}

interface OrderItem {
    id: string;
    product_name: string;
    pack_size: string;
    unit: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export function OrderDetailPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [items, setItems] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        if (!id) {
            navigate('/orders');
            return;
        }

        const fetchOrderDetail = async () => {
            try {
                setLoading(true);

                // Fetch order
                const { data: orderData, error: orderError } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('id', id)
                    .eq('user_id', user.id)
                    .single();

                if (orderError) {
                    if (orderError.code === 'PGRST116') {
                        setError('Order not found');
                    } else {
                        throw orderError;
                    }
                    return;
                }

                setOrder(orderData);

                // Fetch order items
                const { data: itemsData, error: itemsError } = await supabase
                    .from('order_items')
                    .select('*')
                    .eq('order_id', id);

                if (itemsError) throw itemsError;
                setItems(itemsData || []);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching order:', err);
                setError('Failed to load order details');
                toast.error('Failed to load order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [user, id, navigate]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'shipped':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'processing':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'confirmed':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'pending':
                return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="w-5 h-5" />;
            case 'shipped':
                return <Truck className="w-5 h-5" />;
            case 'processing':
                return <Package className="w-5 h-5" />;
            case 'confirmed':
                return <Package className="w-5 h-5" />;
            default:
                return <Package className="w-5 h-5" />;
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getTimelineSteps = () => {
        const steps = [
            { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
            { status: 'processing', label: 'Processing', icon: Package },
            { status: 'shipped', label: 'Shipped', icon: Truck },
            { status: 'delivered', label: 'Delivered', icon: CheckCircle },
        ];

        const statusOrder = ['confirmed', 'processing', 'shipped', 'delivered'];
        const currentIndex = statusOrder.indexOf(order?.order_status || 'confirmed');

        return steps.map((step, idx) => ({
            ...step,
            completed: idx <= currentIndex,
            active: idx === currentIndex,
        }));
    };

    if (!user) return null;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f2ecdc]/30 py-12 mt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/orders')}
                    className="flex items-center gap-2 text-[#004606] font-medium mb-8 hover:gap-3 transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Orders
                </button>

                {/* Loading State */}
                {loading ? (
                    <div className="bg-white rounded-2xl border p-12 text-center">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#004606] rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-500">Loading order details…</p>
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="bg-white rounded-2xl border p-6 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Error</h3>
                            <p className="text-sm text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={() => navigate('/orders')}
                                className="text-sm text-[#004606] font-medium hover:underline"
                            >
                                Return to Orders
                            </button>
                        </div>
                    </div>
                ) : order ? (
                    /* Order Details */
                    <div className="space-y-6">
                        {/* Header Card */}
                        <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        Order #{order.id.slice(0, 8).toUpperCase()}
                                    </h1>
                                    <p className="text-gray-500 text-sm">
                                        Ordered on {formatDate(order.created_at)}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold border inline-flex items-center justify-center gap-2 ${getStatusColor(
                                            order.order_status
                                        )}`}
                                    >
                                        {getStatusIcon(order.order_status)}
                                        {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                    </span>
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${getPaymentStatusColor(
                                            order.payment_status
                                        )}`}
                                    >
                                        {order.payment_status === 'paid' ? '✓ ' : ''}
                                        Payment {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Timeline */}
                            {['confirmed', 'processing', 'shipped', 'delivered'].includes(order.order_status) && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Order Progress</h3>
                                    <div className="flex items-center gap-2">
                                        {getTimelineSteps().map((step, idx) => (
                                            <div key={step.status} className="flex items-center flex-1">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${step.completed
                                                        ? 'bg-green-500 text-white'
                                                        : step.active
                                                            ? 'bg-[#004606] text-white ring-4 ring-[#004606]/20'
                                                            : 'bg-gray-200 text-gray-500'
                                                        }`}
                                                >
                                                    <step.icon className="w-5 h-5" />
                                                </div>
                                                {idx < getTimelineSteps().length - 1 && (
                                                    <div
                                                        className={`flex-1 h-1 mx-1 rounded-full transition-all ${step.completed ? 'bg-green-500' : 'bg-gray-200'
                                                            }`}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-3 text-xs text-gray-500">
                                        {getTimelineSteps().map((step) => (
                                            <span key={step.status} className="text-center flex-1">
                                                {step.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Package className="w-5 h-5 text-[#004606]" />
                                Order Items ({items.length})
                            </h2>

                            <div className="space-y-4">
                                {items.length === 0 ? (
                                    <p className="text-gray-500 text-center py-6">No items in this order</p>
                                ) : (
                                    items.map((item, idx) => (
                                        <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                                            {/* Item Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 mb-1">{item.product_name}</h3>
                                                <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
                                                    <span className="px-2 py-1 bg-[#f2ecdc] text-[#004606] rounded text-xs font-medium">
                                                        {item.pack_size}
                                                        {item.unit}
                                                    </span>
                                                    <span>Quantity: {item.quantity}</span>
                                                    <span>₹{item.price.toLocaleString('en-IN')} each</span>
                                                </div>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-lg font-bold text-[#004606]">
                                                    ₹{item.subtotal.toLocaleString('en-IN')}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Order Summary */}
                            <div className="mt-6 pt-6 border-t space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{order.total_amount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-[#004606] pt-3 border-t">
                                    <span>Total Amount</span>
                                    <span>₹{order.total_amount.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#004606]" />
                                Delivery Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Recipient */}
                                <div className="bg-[#f2ecdc]/30 rounded-lg p-4 space-y-3">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <User className="w-4 h-4 text-[#004606]" />
                                        Recipient
                                    </h3>
                                    <div>
                                        <p className="text-sm text-gray-600">Name</p>
                                        <p className="font-medium text-gray-900">{order.shipping_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <Phone className="w-4 h-4" />
                                            Phone
                                        </p>
                                        <p className="font-medium text-gray-900">{order.shipping_phone}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="bg-[#f2ecdc]/30 rounded-lg p-4 space-y-3">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-[#004606]" />
                                        Delivery Address
                                    </h3>
                                    <div>
                                        <p className="font-medium text-gray-900 mb-1">{order.shipping_address}</p>
                                        <p className="text-sm text-gray-600">
                                            {order.shipping_city}
                                            {order.shipping_state && `, ${order.shipping_state}`}
                                        </p>
                                        {order.shipping_pincode && (
                                            <p className="text-sm text-gray-600">Pincode: {order.shipping_pincode}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Notes */}
                        {order.notes && (
                            <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
                                <h3 className="font-semibold text-gray-900 mb-3">Order Notes</h3>
                                <p className="text-gray-600 text-sm">{order.notes}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/orders')}
                                className="w-full bg-white border-2 border-[#004606] text-[#004606] font-semibold py-3 rounded-xl hover:bg-[#004606]/5 transition"
                            >
                                Back to All Orders
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-[#004606] hover:bg-[#006609] text-white font-semibold py-3 rounded-xl transition"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Not Found */
                    <div className="bg-white rounded-2xl border p-12 text-center">
                        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Not Found</h3>
                        <p className="text-gray-500 mb-6">This order doesn't exist or you don't have permission to view it.</p>
                        <button
                            onClick={() => navigate('/orders')}
                            className="inline-block bg-[#004606] hover:bg-[#006609] text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Return to Orders
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}