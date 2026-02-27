import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';
import { User, MapPin, Mail, Phone, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
}

export function MyProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') throw error;

                // If user doesn't exist in users table, create entry
                if (!data) {
                    const newProfile: UserProfile = {
                        id: user.id,
                        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                        email: user.email || '',
                        phone: '',
                        address: '',
                        city: '',
                        state: '',
                        pincode: '',
                    };
                    setProfile(newProfile);
                } else {
                    setProfile(data);
                }
            } catch (err: any) {
                console.error('Error fetching profile:', err);
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!profile) return;
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
        setHasChanges(true);
    };

    const handleSave = async () => {
        if (!profile) return;

        try {
            setSaving(true);

            // Validate required fields
            if (!profile.name?.trim()) {
                toast.error('Name is required');
                return;
            }

            const { error } = await supabase
                .from('users')
                .upsert({
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone || null,
                    address: profile.address || null,
                    city: profile.city || null,
                    state: profile.state || null,
                    pincode: profile.pincode || null,
                }, { onConflict: 'id' });

            if (error) throw error;

            setHasChanges(false);
            setEditMode(false);
            toast.success('Profile updated successfully');
        } catch (err: any) {
            console.error('Error saving profile:', err);
            toast.error('Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    if (!user) return null;

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#f2ecdc]/30 py-12 mt-20">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-2xl border p-12 text-center">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#004606] rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-500">Loading profile…</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#f2ecdc]/30 py-12 mt-20">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-2xl border p-6 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Error Loading Profile</h3>
                            <p className="text-sm text-gray-600">Please try refreshing the page.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f2ecdc]/30 py-12 mt-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#004606] mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your personal information and delivery addresses</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8 space-y-6">
                    {/* Profile Header with Avatar */}
                    <div className="flex items-start gap-4 pb-6 border-b">
                        <div className="w-16 h-16 rounded-full bg-[#004606]/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-8 h-8 text-[#004606]" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                            <p className="text-gray-500 text-sm">{profile.email}</p>
                        </div>
                        {!editMode && (
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-4 py-2 border border-[#004606] text-[#004606] font-medium rounded-lg hover:bg-[#004606]/5 transition"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {/* Personal Information */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">{profile.name}</p>
                                )}
                            </div>

                            {/* Email (Read-only) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </label>
                                <p className="text-gray-900 font-medium text-sm">{profile.email}</p>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Phone Number
                                </label>
                                {editMode ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profile.phone || ''}
                                        onChange={handleChange}
                                        placeholder="10-digit mobile number"
                                        maxLength={10}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">{profile.phone || '—'}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Delivery Address */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-[#004606]" />
                            <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
                        </div>

                        {editMode ? (
                            <div className="bg-[#f2ecdc]/30 rounded-lg p-4 space-y-4">
                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                    <textarea
                                        name="address"
                                        value={profile.address || ''}
                                        onChange={(e) => {
                                            setProfile({ ...profile, address: e.target.value });
                                            setHasChanges(true);
                                        }}
                                        placeholder="House no, street, landmark"
                                        rows={2}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-outline-none focus:ring-2 focus:ring-[#004606]/20 resize-none"
                                    />
                                </div>

                                {/* City, State, Pincode */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={profile.city || ''}
                                            onChange={handleChange}
                                            placeholder="City"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={profile.state || ''}
                                            onChange={handleChange}
                                            placeholder="State"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={profile.pincode || ''}
                                            onChange={handleChange}
                                            placeholder="6-digit pincode"
                                            maxLength={6}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004606]/20"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#f2ecdc]/30 rounded-lg p-4 space-y-2">
                                {profile.address ? (
                                    <>
                                        <p className="text-gray-900 font-medium">{profile.address}</p>
                                        <p className="text-gray-600 text-sm">
                                            {[profile.city, profile.state, profile.pincode].filter(Boolean).join(', ')}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-500 text-sm italic">No address saved yet</p>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t">
                        {editMode && (
                            <button
                                onClick={() => {
                                    setEditMode(false);
                                    setHasChanges(false);
                                }}
                                disabled={saving}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                        )}
                        {editMode && (
                            <button
                                onClick={handleSave}
                                disabled={saving || !hasChanges}
                                className="px-6 py-2.5 bg-[#004606] hover:bg-[#006609] disabled:opacity-60 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving…
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <button
                        onClick={() => navigate('/orders')}
                        className="bg-white rounded-2xl border shadow-sm p-6 text-left hover:shadow-md transition"
                    >
                        <h3 className="font-semibold text-gray-900 mb-1">My Orders</h3>
                        <p className="text-sm text-gray-600">View your order history and tracking</p>
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-white rounded-2xl border shadow-sm p-6 text-left hover:shadow-md transition"
                    >
                        <h3 className="font-semibold text-gray-900 mb-1">Continue Shopping</h3>
                        <p className="text-sm text-gray-600">Browse more products from our catalog</p>
                    </button>
                </div>
            </div>
        </div>
    );
}