import { useState, useEffect } from 'react';
import {
    MessageSquare,
    Search,
    Download,
    Eye,
    Trash2,
    Clock,
    CheckCircle,
    AlertCircle,
    X,
    Save,
    MapPin,
    Briefcase,
    Mail,
    User,
    Phone
} from 'lucide-react';
import { enquiryService } from '../../services/enquiry.service';

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({ status: '', internalNotes: '' });

    useEffect(() => {
        fetchEnquiries();
    }, [searchTerm, statusFilter]);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const params = {
                search: searchTerm,
                status: statusFilter
            };
            const response = await enquiryService.getAllEnquiries(params);
            setEnquiries(response.data);
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setEditData({
            status: enquiry.status,
            internalNotes: enquiry.internalNotes || ''
        });
        setIsModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            await enquiryService.updateStatus(selectedEnquiry._id, editData.status);
            await enquiryService.updateNotes(selectedEnquiry._id, editData.internalNotes);
            setIsModalOpen(false);
            fetchEnquiries();
        } catch (error) {
            console.error('Error updating enquiry:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                await enquiryService.deleteEnquiry(id);
                fetchEnquiries();
            } catch (error) {
                console.error('Error deleting enquiry:', error);
            }
        }
    };

    const exportToCSV = () => {
        if (enquiries.length === 0) return;

        const headers = ['Date', 'Name', 'Email', 'Company', 'Country', 'Service', 'Requirements', 'Message', 'Status', 'Internal Notes'];
        const csvRows = [
            headers.join(','),
            ...enquiries.map(e => [
                new Date(e.createdAt).toLocaleDateString(),
                `"${e.name}"`,
                `"${e.email}"`,
                `"${e.company || ''}"`,
                `"${e.country || ''}"`,
                `"${e.serviceSelected}"`,
                `"${(e.projectRequirements || '').replace(/"/g, '""')}"`,
                `"${(e.message || '').replace(/"/g, '""')}"`,
                `"${e.status}"`,
                `"${(e.internalNotes || '').replace(/"/g, '""')}"`
            ].join(','))
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'In Review': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Closed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'New': return <AlertCircle className="w-3.5 h-3.5 mr-1" />;
            case 'In Review': return <Clock className="w-3.5 h-3.5 mr-1" />;
            case 'Closed': return <CheckCircle className="w-3.5 h-3.5 mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Enquiries</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage and track all contact form submissions</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 font-bold"
                >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters */}
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium"
                        />
                    </div>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2">Status:</span>
                        {['All', 'New', 'In Review', 'Closed'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${statusFilter === status
                                    ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Client</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Service</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-20"></div></td>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                ))
                            ) : enquiries.length > 0 ? (
                                enquiries.map((enquiry) => (
                                    <tr key={enquiry._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold mr-4">
                                                    {enquiry.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{enquiry.name}</p>
                                                    <p className="text-sm text-gray-500 font-medium">{enquiry.email}</p>
                                                    {enquiry.company && <p className="text-xs text-primary-600 font-bold mt-0.5 uppercase tracking-tighter">{enquiry.company}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                                                {enquiry.serviceSelected}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(enquiry.status)}`}>
                                                {getStatusIcon(enquiry.status)}
                                                {enquiry.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleOpenModal(enquiry)}
                                                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(enquiry._id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center">
                                        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                            <MessageSquare className="w-10 h-10" />
                                        </div>
                                        <p className="text-gray-500 font-bold">No enquiries found matching your criteria</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Details & Editing */}
            {isModalOpen && selectedEnquiry && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Enquiry Details</h3>
                                <p className="text-sm font-medium text-gray-500">Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-200 shadow-sm">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Client Name</label>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <User className="w-4 h-4 text-primary-500 mr-3" />
                                        <span className="font-bold text-gray-900">{selectedEnquiry.name}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <Mail className="w-4 h-4 text-indigo-500 mr-3" />
                                        <span className="font-bold text-gray-900">{selectedEnquiry.email}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Company</label>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <Briefcase className="w-4 h-4 text-amber-500 mr-3" />
                                        <span className="font-bold text-gray-900">{selectedEnquiry.company || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Country</label>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <MapPin className="w-4 h-4 text-emerald-500 mr-3" />
                                        <span className="font-bold text-gray-900">{selectedEnquiry.country || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                                    <div className="flex items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <Phone className="w-4 h-4 text-primary-600 mr-3" />
                                        <span className="font-bold text-gray-900">{selectedEnquiry.phoneNumber || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Service Selected</label>
                                <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl border border-primary-100 font-extrabold text-sm inline-block">
                                    {selectedEnquiry.serviceSelected}
                                </div>
                            </div>

                            {selectedEnquiry.projectRequirements && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Project Requirements</label>
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 font-medium text-gray-700 leading-relaxed italic">
                                        "{selectedEnquiry.projectRequirements}"
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Main Message</label>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 font-medium text-gray-700 leading-relaxed">
                                    {selectedEnquiry.message}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Current Status</label>
                                    <div className="flex gap-2">
                                        {['New', 'In Review', 'Closed'].map(st => (
                                            <button
                                                key={st}
                                                onClick={() => setEditData({ ...editData, status: st })}
                                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-tight transition-all border ${editData.status === st
                                                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                                                    : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                {st}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Internal Admin Notes</label>
                                    <textarea
                                        value={editData.internalNotes}
                                        onChange={(e) => setEditData({ ...editData, internalNotes: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium min-h-[100px]"
                                        placeholder="Add notes for the team..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={handleUpdate}
                                className="flex items-center space-x-2 bg-primary-600 text-white px-8 py-3.5 rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 font-black active:scale-95"
                            >
                                <Save className="w-5 h-5" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enquiries;
