import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        company: '',
        country: '',
        serviceSelected: '',
        projectRequirements: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const [contactContent, setContactContent] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchContent = async () => {
            try {
                const response = await api.get('/content/contact');
                if (response.data.success) {
                    setContactContent(response.data.data.contact);
                }
            } catch (error) {
                console.error('Error fetching contact content:', error);
            }
        };

        fetchContent();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('http://localhost:5000/api/enquiries/submit', formData);
            setStatus('success');
            setMessage('Your message has been sent successfully. We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                company: '',
                country: '',
                serviceSelected: '',
                projectRequirements: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <>
            <Navbar />

            {/* Contact Hero Section */}
            <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8">
                    {/* Left Side Content */}
                    <div className="max-w-4xl">
                        <div className="mb-3 sm:mb-4 h-1 w-16 sm:w-20 bg-[#D9BB8E]" />
                        <p className="mb-4 sm:mb-6 text-base sm:text-lg md:text-xl font-medium text-slate-800">
                            Get Started
                        </p>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#001B2F]">
                            Get in touch with us.
                            <br />
                            We're here to assist you.
                        </h1>
                    </div>

                    {/* Right Side Social Icons */}
                    <div className="flex gap-4 sm:gap-6 md:mt-10 md:flex-col md:items-end">
                        <a href="#" className="text-slate-900 hover:text-slate-600 transition">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
                                <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.241 12.876L1.095 2.25H7.952L12.812 8.674L18.244 2.25ZM17.087 19.769H18.92L6.645 4.126H4.664L17.087 19.769Z" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="#" className="hover:opacity-80 transition">
                            <img src="/images/link3.png" alt="LinkedIn" className="h-5 w-5 sm:h-6 sm:w-6" />
                        </a>
                        <a href="#" className="hover:opacity-80 transition">
                            <img src="/images/insta3.png" alt="Instagram" className="h-5 w-5 sm:h-6 sm:w-6" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="px-4 sm:px-6 pb-10 sm:pb-12 md:pb-16 lg:pb-24">
                <div className="mx-auto max-w-7xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
                            <div className="group relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    className="w-full border-b border-slate-300 bg-transparent py-2 sm:py-3 text-sm sm:text-base text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                            <div className="group relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full border-b border-slate-300 bg-transparent py-2 sm:py-3 text-sm sm:text-base text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                            <div className="group relative">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number (optional)"
                                    className="w-full border-b border-slate-300 bg-transparent py-2 sm:py-3 text-sm sm:text-base text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
                            <div className="group relative">
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="w-full border-b border-slate-300 bg-transparent py-2 sm:py-3 text-sm sm:text-base text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                            <div className="group relative">
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="w-full border-b border-slate-300 bg-transparent py-2 sm:py-3 text-sm sm:text-base text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                            <div className="group relative">
                                <input
                                    type="text"
                                    name="serviceSelected"
                                    value={formData.serviceSelected}
                                    onChange={handleChange}
                                    placeholder="Services interested in"
                                    required
                                    className="w-full border-b border-slate-300 bg-transparent py-2 sm:py-3 text-sm sm:text-base text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                        </div>

                        {/* Row 3 - Large Text Area */}
                        <div className="group relative">
                            <textarea
                                name="projectRequirements"
                                value={formData.projectRequirements}
                                onChange={handleChange}
                                placeholder="Project requirements"
                                rows="1"
                                className="w-full resize-none border-b border-slate-300 bg-transparent py-2 sm:py-3 text-sm sm:text-base text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="rounded bg-[#001B2F] px-8 sm:px-12 md:px-16 lg:px-20 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-opacity-90 disabled:opacity-50 w-full sm:w-auto"
                            >
                                {status === 'loading' ? 'Sending...' : 'Leave us a message'}
                            </button>
                            {message && (
                                <p className={`mt-3 sm:mt-4 text-xs sm:text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </section>

            {/* Contact Image Section */}
            <section className="w-full px-4 sm:px-0">
                <div className="max-w-7xl mx-auto h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg sm:rounded-none">
                    <img
                        src={contactContent?.image || "/images/contact1.png"}
                        alt="Contact visual"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
                    {/* Left Side */}
                    <div>
                        <div className="mb-3 sm:mb-4 h-1 w-16 sm:w-20 bg-[#D9BB8E]" />
                        <p className="mb-4 sm:mb-6 text-base sm:text-lg md:text-xl font-medium text-slate-800">
                            Contact Info
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#001B2F]">
                            We are always
                            <br />
                            happy to assist you
                        </h2>
                    </div>

                    {/* Right Side */}
                    <div className="grid gap-10 sm:gap-12 md:gap-16 lg:gap-20 sm:grid-cols-2 items-start">
                        {/* Email Block */}
                        <div>
                            <h3 className="text-xs sm:text-sm font-semibold text-[#001B2F]">Email Address</h3>
                            <div className="my-3 sm:my-4 h-0.5 w-4 bg-slate-800" />
                            <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-slate-700">
                                loremipsum@loremipsum.com
                            </p>
                            <p className="text-[10px] sm:text-xs leading-relaxed text-slate-500">
                                Assistance hours:
                                <br />
                                Monday - Friday 6 am to
                                <br />
                                8 pm EST
                            </p>
                        </div>

                        {/* Number Block */}
                        <div>
                            <h3 className="text-xs sm:text-sm font-semibold text-[#001B2F]">Number</h3>
                            <div className="my-3 sm:my-4 h-0.5 w-4 bg-slate-800" />
                            <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-slate-700">
                                (+31) 11111111111
                            </p>
                            <p className="text-[10px] sm:text-xs leading-relaxed text-slate-500">
                                Assistance hours:
                                <br />
                                Monday - Friday 6 am to
                                <br />
                                8 pm EST
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
