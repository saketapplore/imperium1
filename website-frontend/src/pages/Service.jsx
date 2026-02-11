import { useEffect, useState } from 'react';
import api from '../services/api';
import Footer from '../components/Footer';

const Service = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchServices = async () => {
            try {
                const response = await api.get('/content/services');
                if (response.data.success) {
                    setServices(response.data.data.services || []);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

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

            {/* Hero / Title Section */}
            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 h-1 w-20 bg-[#D9BB8E]" />
                    <h4 className="mb-4 text-xl font-medium text-slate-800">
                        Our services
                    </h4>

                    <div className="flex flex-col lg:flex-row">
                        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#001B2F] md:text-5xl lg:text-6xl">
                            Strategic Solutions for
                            <br />
                            <span style={{ color: '#D4B684', fontFamily: 'Urbanist', fontSize: '66px', fontStyle: 'normal', fontWeight: '700', lineHeight: '120%' }}>
                                Global Expansion
                            </span>
                        </h1>

                        <p className="max-w-[50%] text-xl leading-relaxed md:-ml-32 text-slate-700 md:text-lg lg:mt-[180px]">
                            We deliver structured, compliant international trade and distribution solutions that protect brand value and enable sustainable global growth.
                        </p>
                    </div>
                </div>
            </section>

            {/* Service 21 Image Section */}
            <section className="w-full">
                <div className="w-full">
                    <img
                        src="/images/service21.png"
                        alt="Service Overview"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>

            {loading ? (
                <div className="py-20 text-center">
                    <p className="text-slate-500">Loading services...</p>
                </div>
            ) : services.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-slate-500">No services found.</p>
                </div>
            ) : (
                services.map((service, index) => (
                    <section key={service._id} className="w-full px-6">
                        <div className="mx-auto grid max-w-7xl gap-10 border-b border-[#B0B8BF] py-16 md:py-24 lg:grid-cols-2 lg:gap-20 lg:items-stretch">
                            {index % 2 === 0 ? (
                                <>
                                    {/* Left - Image */}
                                    <div className="relative overflow-hidden rounded-lg">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="h-[500px] w-[600px] object-cover"
                                        />
                                    </div>

                                    {/* Right - Content */}
                                    <div className="flex flex-col items-start gap-6 h-full justify-between">
                                        <div>
                                            <h2 className="text-3xl font-bold leading-tight text-[#001B2F] md:text-4xl mb-6">
                                                {service.title}
                                            </h2>
                                            <p className="text-sm leading-relaxed text-slate-600 md:text-xl">
                                                {service.detailedDescription || service.shortSummary}
                                            </p>
                                        </div>
                                        <button type="button" className="border-b border-slate-900 pb-0.5 text-base font-medium text-slate-900 transition hover:opacity-70">
                                            Read more
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Left - Content */}
                                    <div className="order-2 flex flex-col items-start gap-6 lg:order-1 h-full justify-between">
                                        <div>
                                            <h2 className="text-3xl font-bold leading-tight text-[#001B2F] md:text-4xl mb-6">
                                                {service.title}
                                            </h2>
                                            <p className="text-sm leading-relaxed text-slate-600 md:text-xl">
                                                {service.detailedDescription || service.shortSummary}
                                            </p>
                                        </div>
                                        <button type="button" className="border-b border-slate-900 pb-0.5 text-base font-medium text-slate-900 transition hover:opacity-70">
                                            Read more
                                        </button>
                                    </div>

                                    {/* Right - Image */}
                                    <div className="order-1 relative overflow-hidden rounded-lg lg:order-2">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="h-[500px] w-[600px] object-cover"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                ))
            )}

            {/* Focused Categories Section */}
            <section className="w-full px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 h-1 w-20 bg-[#D9BB8E]" />
                    <p className="mb-6 text-lg font-medium text-slate-800">
                        Focused Categories
                    </p>
                    <h2 className="max-w-7xl" style={{ color: '#000B14', fontFamily: 'Urbanist', fontSize: '61px', fontStyle: 'normal', fontWeight: '700', lineHeight: '120%' }}>
                        We work across a focused set of international trade and distribution categories where structure, compliance, and brand integrity <br /> are critical.
                    </h2>
                </div>
            </section>

            {/* FMCG Slider Section */}
            <section className="w-full px-6 pb-16 md:pb-24">
                <div className="mx-auto max-w-7xl relative flex items-center">
                    {/* Image Container */}
                    <div className="w-full md:w-[65%] h-[500px] md:h-[600px] relative rounded-lg overflow-hidden">
                        <img
                            src="/images/iservice7.png"
                            alt="Supermarket aisle with packed shelves"
                            className="w-full h-full object-fill"
                        />
                    </div>

                    {/* Content Card */}
                    <div className="absolute right-0 bg-[#FAF9F6] p-4 md:p-6 max-w-[500px] shadow-lg rounded-lg bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 mx-4 md:mx-0">
                        <div className="flex items-center gap-1 text-slate-400 text-sm font-medium mb-4">
                            <span className="text-slate-900">01</span>
                            <span>/</span>
                            <span>04</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#001B2F] mb-6">
                            FMCG & Consumer Goods
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-10">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4">
                            <button className="h-10 w-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition">
                                <span className="sr-only">Previous</span>
                                ←
                            </button>
                            <button className="h-10 w-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition">
                                <span className="sr-only">Next</span>
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global reach section */}
            <section className="relative h-[450px] w-full overflow-hidden md:h-[550px]">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-[url('/images/ihome10.png')] bg-cover bg-center bg-no-repeat"
                />

                {/* Content */}
                <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
                    <h2 className="mb-10 text-4xl font-semibold tracking-tight md:text-6xl">
                        Global reach, local expertise
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="rounded-md bg-[#D9BB8E] px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#ceae7d]">
                            Explore Solutions
                        </button>
                        <button className="rounded-md border border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                            Contact us
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    );
};

export default Service;
