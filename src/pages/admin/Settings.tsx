import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { toast } from "react-toastify";

export default function Settings() {
  const [storeName, setStoreName] = useState("Roots & Drop Nutriments");
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [currency, setCurrency] = useState("INR");
  const [orderEmail, setOrderEmail] = useState(true);
  const [customerEmail, setCustomerEmail] = useState(true);

  const handleSave = () => {
    // 🔜 Replace with API call later
    toast.success("Settings saved successfully");
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="bg-white rounded-xl shadow p-6 space-y-8">

        {/* Store Info */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Store Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Store Name
              </label>
              <input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={orderEmail}
                onChange={() => setOrderEmail(!orderEmail)}
                className="w-4 h-4"
              />
              <span>Send email on new orders</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={customerEmail}
                onChange={() => setCustomerEmail(!customerEmail)}
                className="w-4 h-4"
              />
              <span>Send email on new customer registration</span>
            </label>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#004606] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006609]"
          >
            Save Settings
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
