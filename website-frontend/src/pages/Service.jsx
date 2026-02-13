import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Service = () => {
    const [services, setServices] = useState([]);
    const [focusedCategories, setFocusedCategories] = useState([]);
    const [growthSection, setGrowthSection] = useState(null);
    const [heroContent, setHeroContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [expandedIds, setExpandedIds] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchContent = async () => {
            try {
                const response = await api.get('/content/services');
                if (response.data.success) {
                    setServices(response.data.data.services || []);
                    setFocusedCategories(response.data.data.focusedCategories || []);
                    setGrowthSection(response.data.data.growthSection || null);
                    setHeroContent(response.data.data.hero || null);
                }
            } catch (error) {
                console.error('Error fetching services content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const nextCategory = () => {
        if (focusedCategories.length === 0) return;
        setCurrentCategoryIndex((prev) => (prev + 1) % focusedCategories.length);
    };

    const prevCategory = () => {
        if (focusedCategories.length === 0) return;
        setCurrentCategoryIndex((prev) => (prev - 1 + focusedCategories.length) % focusedCategories.length);
    };

    const currentCategory = focusedCategories[currentCategoryIndex];

    const toggleService = (id) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <>
            <Navbar />

            {/* Hero / Title Section */}
            <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-3 sm:mb-4 h-1 w-16 sm:w-20 bg-[#D9BB8E]" />
                    <h4 className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-medium text-slate-800">
                        {heroContent?.subheading || "Our services"}
                    </h4>

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
                        <h1 className="max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#001B2F]">
                            {heroContent?.headingMain || "Strategic Solutions for"}
                            <br />
                            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[66px] font-bold" style={{ color: '#D4B684', fontFamily: 'Urbanist', lineHeight: '120%' }}>
                                {heroContent?.headingAccent || "Global Expansion"}
                            </span>
                        </h1>

                        <p className="max-w-full lg:max-w-[50%] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-700 lg:-ml-[50px] lg:mt-[180px]">
                            {heroContent?.description || "We deliver structured, compliant international trade and distribution solutions that protect brand value and enable sustainable global growth."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Service 21 Image Section */}
            {(!growthSection || growthSection.isActive) && (
                <section className="w-full px-4 sm:px-0">
                    <div className="w-full">
                        <img
                            src={growthSection?.image || "/images/service21.png"}
                            alt="Service Overview"
                            className="w-full h-auto object-cover rounded-lg sm:rounded-none"
                        />
                    </div>
                </section>
            )}

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
                    <section key={service._id} className="w-full px-4 sm:px-6">
                        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 md:gap-10 border-b border-[#B0B8BF] py-10 sm:py-12 md:py-16 lg:py-24 lg:grid-cols-2 lg:gap-20 lg:items-stretch">
                            {index % 2 === 0 ? (
                                <>
                                    {/* Left - Image */}
                                    <div className="relative overflow-hidden rounded-lg">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
                                        />
                                    </div>

                                    {/* Right - Content */}
                                    <div className="flex flex-col items-start gap-4 sm:gap-6 h-full justify-between">
                                        <div>
                                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-[#001B2F] mb-3 sm:mb-4 md:mb-6">
                                                {service.title}
                                            </h2>
                                            <p className={`text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed text-slate-600 transition-all duration-300 ${!expandedIds.includes(service._id) ? 'line-clamp-4' : ''}`}>
                                                {service.detailedDescription || service.shortSummary}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => toggleService(service._id)}
                                            className="border-b border-slate-900 pb-0.5 text-sm sm:text-base font-medium text-slate-900 transition hover:opacity-70"
                                        >
                                            {expandedIds.includes(service._id) ? 'Read less' : 'Read more'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Left - Content */}
                                    <div className="order-2 flex flex-col items-start gap-4 sm:gap-6 lg:order-1 h-full justify-between">
                                        <div>
                                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-[#001B2F] mb-3 sm:mb-4 md:mb-6">
                                                {service.title}
                                            </h2>
                                            <p className={`text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed text-slate-600 transition-all duration-300 ${!expandedIds.includes(service._id) ? 'line-clamp-4' : ''}`}>
                                                {service.detailedDescription || service.shortSummary}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => toggleService(service._id)}
                                            className="border-b border-slate-900 pb-0.5 text-sm sm:text-base font-medium text-slate-900 transition hover:opacity-70"
                                        >
                                            {expandedIds.includes(service._id) ? 'Read less' : 'Read more'}
                                        </button>
                                    </div>

                                    {/* Right - Image */}
                                    <div className="order-1 relative overflow-hidden rounded-lg lg:order-2">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                ))
            )}

            {/* Focused Categories Section */}
            <section className="w-full px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-3 sm:mb-4 h-1 w-16 sm:w-20 bg-[#D9BB8E]" />
                    <p className="mb-4 sm:mb-6 text-base sm:text-lg font-medium text-slate-800">
                        Focused Categories
                    </p>
                    <h2 className="max-w-7xl text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight" style={{ color: '#000B14', fontFamily: 'Urbanist', lineHeight: '120%' }}>
                        We work across a focused set of international trade and distribution categories where structure, compliance, and brand integrity are critical.
                    </h2>
                </div>
            </section>

            {/* FMCG Slider Section */}
            {!loading && focusedCategories.length > 0 && (
                <section className="w-full px-4 sm:px-6 pb-10 sm:pb-12 md:pb-16 lg:pb-24">
                    <div className="mx-auto max-w-7xl relative flex flex-col md:flex-row items-center">
                        {/* Image Container */}
                        <div className="w-full md:w-[65%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden">
                            <img
                                src={currentCategory?.image}
                                alt={currentCategory?.title}
                                className="w-full h-full object-cover transition-opacity duration-500"
                            />
                        </div>

                        {/* Content Card */}
                        <div className="relative md:absolute md:right-0 bg-[#FAF9F6] p-4 sm:p-5 md:p-6 w-full md:max-w-[400px] lg:max-w-[500px] shadow-lg rounded-lg -mt-10 md:mt-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 mx-0 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col justify-center">
                            <div className="flex items-center gap-1 text-slate-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                                <span className="text-slate-900">{String(currentCategoryIndex + 1).padStart(2, '0')}</span>
                                <span>/</span>
                                <span>{String(focusedCategories.length).padStart(2, '0')}</span>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#001B2F] mb-3 sm:mb-4 md:mb-6">
                                {currentCategory?.title}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 md:mb-10">
                                {currentCategory?.description}
                            </p>

                            {/* Navigation Buttons */}
                            <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                                <button
                                    onClick={prevCategory}
                                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
                                >
                                    <span className="sr-only">Previous</span>
                                    ←
                                </button>
                                <button
                                    onClick={nextCategory}
                                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
                                >
                                    <span className="sr-only">Next</span>
                                    →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Global reach section */}
            <section className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] w-full overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-[url('/images/ihome10.png')] bg-cover bg-center bg-no-repeat"
                />

                {/* Content */}
                <div className="relative flex h-full w-full flex-col items-center justify-center px-4 sm:px-6 text-center text-white">
                    <h2 className="mb-6 sm:mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight">
                        Global reach, local expertise
                    </h2>

                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                        <button
                            onClick={() => window.location.href = '/services'}
                            className="rounded-md bg-[#D9BB8E] px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-900 transition hover:bg-[#ceae7d]"
                        >
                            Explore Solutions
                        </button>
                        <button
                            onClick={() => window.location.href = '/contact'}
                            className="rounded-md border border-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10"
                        >
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
