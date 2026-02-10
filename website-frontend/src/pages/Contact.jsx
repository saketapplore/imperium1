import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            <header className="w-full bg-[#001B2F] px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    {/* Left - Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src="/images/ilogo.png"
                            alt="Solved Imperium Ventures"
                            className="h-14 w-auto object-contain"
                        />
                    </div>

                    {/* Right - Navigation */}
                    <nav className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
                            <a href="/" className="hover:text-amber-300 transition">
                                Home
                            </a>
                            <a href="/services" className="hover:text-amber-300 transition">
                                Services
                            </a>
                            <a href="/about" className="hover:text-amber-300 transition">
                                About us
                            </a>
                        </div>

                        <a href="/contact" className="rounded-full bg-[#D9BB8E] px-6 py-2 text-sm font-semibold text-slate-900 hover:bg-[#ceae7d] transition">
                            Contact us
                        </a>
                    </nav>
                </div>
            </header>

            {/* Contact Hero Section */}
            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start">
                    {/* Left Side Content */}
                    <div className="max-w-4xl">
                        <div className="mb-4 h-1 w-20 bg-[#D9BB8E]" />
                        <p className="mb-6 text-xl font-medium text-slate-800">
                            Get Started
                        </p>
                        <h1 className="text-4xl font-bold leading-tight text-[#001B2F] md:text-5xl lg:text-6xl">
                            Get in touch with us.
                            <br />
                            We're here to assist you.
                        </h1>
                    </div>

                    {/* Right Side Social Icons */}
                    <div className="mt-8 flex gap-6 md:mt-10 md:flex-col md:items-end">
                        <a href="#" className="text-slate-900 hover:text-slate-600 transition">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.241 12.876L1.095 2.25H7.952L12.812 8.674L18.244 2.25ZM17.087 19.769H18.92L6.645 4.126H4.664L17.087 19.769Z" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="#" className="hover:opacity-80 transition">
                            <img src="/images/link3.png" alt="LinkedIn" className="h-6 w-6" />
                        </a>
                        <a href="#" className="hover:opacity-80 transition">
                            <img src="/images/insta3.png" alt="Instagram" className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="px-6 pb-16 md:pb-24">
                <div className="mx-auto max-w-7xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
                            <div className="group relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    className="w-full border-b border-slate-300 bg-transparent py-3 text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
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
                                    className="w-full border-b border-slate-300 bg-transparent py-3 text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                            <div className="group relative">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number (optional)"
                                    className="w-full border-b border-slate-300 bg-transparent py-3 text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
                            <div className="group relative">
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="w-full border-b border-slate-300 bg-transparent py-3 text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                                />
                            </div>
                            <div className="group relative">
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="w-full border-b border-slate-300 bg-transparent py-3 text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
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
                                    className="w-full border-b border-slate-300 bg-transparent py-3 text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
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
                                className="w-full resize-none border-b border-slate-300 bg-transparent text-slate-800 custom-placeholder outline-none focus:border-slate-800 transition"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="rounded bg-[#001B2F] px-20 py-3 text-sm font-semibold text-white transition hover:bg-opacity-90 disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Sending...' : 'Leave us a message'}
                            </button>
                            {message && (
                                <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </section>

            {/* Contact Image Section */}
            <section className="w-full">
                <div className="max-w-7xl mx-auto h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden">
                    <img
                        src="/images/contact1.png"
                        alt="Contact visual"
                        className="w-full h-full object-fill"
                    />
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="bg-[#F8F9FA] px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2">
                    {/* Left Side */}
                    <div>
                        <div className="mb-4 h-0.5 w-10 bg-[#D9BB8E]" />
                        <p className="mb-6 text-sm font-medium text-slate-800">
                            Contact Info
                        </p>
                        <h2 className="text-4xl font-bold leading-tight text-[#001B2F] md:text-5xl">
                            We are always
                            <br />
                            happy to assist you
                        </h2>
                    </div>

                    {/* Right Side */}
                    <div className="grid gap-20 md:grid-cols-2 items-start mt-8 lg:mt-0">
                        {/* Email Block */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#001B2F]">Email Address</h3>
                            <div className="my-4 h-0.5 w-4 bg-slate-800" />
                            <p className="mb-4 text-sm font-medium text-slate-700">
                                loremipsum@loremipsum.com
                            </p>
                            <p className="text-xs leading-relaxed text-slate-500">
                                Assistance hours:
                                <br />
                                Monday - Friday 6 am to
                                <br />
                                8 pm EST
                            </p>
                        </div>

                        {/* Number Block */}
                        <div>
                            <h3 className="text-sm font-semibold text-[#001B2F]">Number</h3>
                            <div className="my-4 h-0.5 w-4 bg-slate-800" />
                            <p className="mb-4 text-sm font-medium text-slate-700">
                                (+31) 11111111111
                            </p>
                            <p className="text-xs leading-relaxed text-slate-500">
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
