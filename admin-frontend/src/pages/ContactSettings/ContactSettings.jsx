import { useState, useEffect } from 'react';
import {
    Settings,
    Save,
    Mail,
    Phone,
    MapPin,
    Plus,
    X,
    Bell,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { settingService } from '../../services/setting.service';

const ContactSettings = () => {
    const [settings, setSettings] = useState({
        notificationEmails: [],
        contactDetails: {
            primaryEmail: '',
            primaryPhone: '',
            officeAddress: ''
        }
    });
    const [newEmail, setNewEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const response = await settingService.getSettings();
            setSettings(response.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
            showToast('error', 'Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAddEmail = (e) => {
        e.preventDefault();
        if (!newEmail) return;

        // Simple email validation
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(newEmail)) {
            showToast('error', 'Invalid email format');
            return;
        }

        if (settings.notificationEmails.includes(newEmail)) {
            showToast('error', 'Email already added');
            return;
        }

        setSettings({
            ...settings,
            notificationEmails: [...settings.notificationEmails, newEmail]
        });
        setNewEmail('');
    };

    const handleRemoveEmail = (email) => {
        setSettings({
            ...settings,
            notificationEmails: settings.notificationEmails.filter(e => e !== email)
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save notification emails
            await settingService.updateNotificationEmails(settings.notificationEmails);

            // Save contact details
            await settingService.updateContactDetails(settings.contactDetails);

            showToast('success', 'Settings updated successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            showToast('error', 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
                <p className="text-gray-500 font-bold tracking-tight">Loading Imperial Settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Contact Settings</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage notifications and company contact info</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-primary-600 text-white px-8 py-3.5 rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 font-black active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Notification Emails Section */}
                    <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                                    <Bell className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Enquiry Notifications</h3>
                                    <p className="text-sm text-gray-500 font-medium">Emails that receive new enquiry alerts</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <form onSubmit={handleAddEmail} className="flex gap-3">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Add new notification email..."
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>
                            </form>

                            <div className="flex flex-wrap gap-3 mt-4">
                                {settings.notificationEmails.length > 0 ? (
                                    settings.notificationEmails.map(email => (
                                        <div
                                            key={email}
                                            className="flex items-center bg-gray-50 border border-gray-100 pl-4 pr-2 py-2 rounded-xl group hover:border-primary-200 hover:bg-primary-50/30 transition-all"
                                        >
                                            <span className="text-sm font-bold text-gray-700">{email}</span>
                                            <button
                                                onClick={() => handleRemoveEmail(email)}
                                                className="ml-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        <p className="text-gray-400 font-bold">No notification emails configured.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Public Contact Details Section */}
                    <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Public Website Info</h3>
                                <p className="text-sm text-gray-500 font-medium">Details displayed on your public contact page</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Primary Support Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={settings.contactDetails.primaryEmail}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            contactDetails: { ...settings.contactDetails, primaryEmail: e.target.value }
                                        })}
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Main Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={settings.contactDetails.primaryPhone}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            contactDetails: { ...settings.contactDetails, primaryPhone: e.target.value }
                                        })}
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Office Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-10 w-4 h-4 text-gray-400" />
                                    <textarea
                                        value={settings.contactDetails.officeAddress}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            contactDetails: { ...settings.contactDetails, officeAddress: e.target.value }
                                        })}
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-600 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Need Help?</h3>
                        <p className="text-gray-400 mb-6 font-medium leading-relaxed">Changes made here will reflect globally across all contact points in your public website and automated mailing systems.</p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-sm font-bold text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>Real-time email alerts</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm font-bold text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>Multi-admin notifications</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-8 right-8 flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-2xl animate-slide-up z-[1000] border ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-red-50 text-red-800 border-red-100'
                    }`}>
                    {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="font-black text-sm">{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default ContactSettings;
