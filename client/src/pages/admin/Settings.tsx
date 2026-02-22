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
    toast.success("Settings saved successfully");
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-semibold">
          Settings
        </h2>
      </div>

      <div className="max-w-4xl bg-white border rounded-xl shadow-sm p-5 md:p-6 space-y-8">

        {/* STORE INFO */}
        <section>
          <h3 className="text-base md:text-lg font-semibold mb-4">
            Store Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Store Name
              </label>
              <input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#004606]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#004606]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Contact Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>
        </section>

        {/* EMAIL NOTIFICATIONS */}
        <section>
          <h3 className="text-base md:text-lg font-semibold mb-4">
            Email Notifications
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={orderEmail}
                onChange={() => setOrderEmail(!orderEmail)}
                className="w-4 h-4 accent-[#004606]"
              />
              <span className="text-sm">
                Send email on new orders
              </span>
            </label>

            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={customerEmail}
                onChange={() => setCustomerEmail(!customerEmail)}
                className="w-4 h-4 accent-[#004606]"
              />
              <span className="text-sm">
                Send email on new customer registration
              </span>
            </label>
          </div>
        </section>

        {/* SAVE ACTION */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#004606] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#006609]"
          >
            Save Settings
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}