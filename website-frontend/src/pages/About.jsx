import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    const [leadership, setLeadership] = useState([]);
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch leadership data
        const fetchLeadership = async () => {
            try {
                const response = await api.get('/content/about');
                if (response.data && response.data.data) {
                    const sortedLeadership = [...(response.data.data.leadership || [])].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
                    setLeadership(sortedLeadership);
                    setImages(response.data.data.images || null);
                }
            } catch (error) {
                console.error('Error fetching leadership:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeadership();
    }, []);

    return (
        <>
            <Navbar />

            {/* About Us Hero Section */}
            <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-3 sm:mb-4 h-0.5 w-12 sm:w-14 bg-[#D9BB8E]" />
                    <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-md font-medium text-slate-800">
                        About us
                    </p>
                    <h1 className="max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#001B2F] mb-6 sm:mb-8">
                        We don't just move goods.
                        <br />
                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[61px] font-bold" style={{ color: '#D4B684', fontFamily: 'Urbanist', lineHeight: '120%' }}>
                            We move markets.
                        </span>
                    </h1>
                    <p className="max-w-3xl text-sm sm:text-base md:text-md lg:text-lg xl:text-xl leading-relaxed text-slate-700">
                        At Solved Imperium Ventures, we turn complexity into clarity and transform opportunities into commercial success. Whether expanding globally or entering a new market, we act as a trusted partner across every step pf the supply chain.
                        With a team of seasoned professionals in different continents, we streaming import/export operations, building strategic global distribution networks to crafting bespoke private label solutions. From concept to container, we deliver tailored results, no matter the category or market.
                    </p>
                </div>
            </section>

            {/* Image & Card Section */}
            <section className="px-4 sm:px-6 pb-10 sm:pb-12 md:pb-16 lg:pb-24">
                <div className="mx-auto max-w-7xl relative">
                    {/* Background Image */}
                    <div className="w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[420px] overflow-hidden rounded-lg md:rounded-none">
                        <img
                            src={images?.topImage || "/images/about2.png"}
                            alt="Team collaboration"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating Card */}
                    <div className="bg-[#EBDDC6] p-4 sm:p-5 md:p-6 w-full max-w-lg relative md:absolute md:-top-12 lg:-top-16 md:right-4 lg:right-12 xl:right-24 -mt-10 md:mt-0 mx-0 rounded-lg">
                        <p className="text-[#000B14] w-full text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-6 sm:mb-8">
                            Whether you're expanding globally, entering a
                            new market, or streamlining operations, we
                            provide the expertise and network to make it
                            happen.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                            <button
                                onClick={() => window.location.href = '/services'}
                                className="bg-[#001B2F] rounded text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-opacity-90 transition text-center"
                            >
                                Explore Solutions
                            </button>
                            <button
                                onClick={() => window.location.href = '/contact'}
                                className="bg-[#546A7B] rounded text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-opacity-90 transition text-center"
                            >
                                Contact us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-3 sm:mb-4 h-1 w-16 sm:w-20 bg-[#D9BB8E]" />
                    <p className="mb-4 sm:mb-6 text-base sm:text-lg md:text-xl font-medium text-slate-800">
                        Our Values
                    </p>
                    <h2 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#001B2F]">
                        The Values That <br /> Guide Every Decision
                    </h2>
                </div>
            </section>

            {/* Values Grid Section */}
            <section className="px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-32">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                    {/* Item 1: Reliable */}
                    <div className="flex flex-col items-start gap-4 sm:gap-6">
                        <div className="h-16 w-16 sm:h-20 sm:w-20">
                            <img src="/images/reliable.png" alt="Reliable icon" className="h-12 w-12 sm:h-[60px] sm:w-[60px] object-contain" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#001B2F]">
                            Reliable
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Item 2: Global Reach */}
                    <div className="flex flex-col items-start gap-4 sm:gap-6">
                        <div className="h-16 w-16 sm:h-20 sm:w-20">
                            <img src="/images/global.png" alt="Global icon" className="h-12 w-12 sm:h-[60px] sm:w-[60px] object-contain" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#001B2F]">
                            Global Reach
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Item 3: Strategic Excellence */}
                    <div className="flex flex-col items-start gap-4 sm:gap-6">
                        <div className="h-16 w-16 sm:h-20 sm:w-20">
                            <img src="/images/strategic.png" alt="Strategic icon" className="h-12 w-12 sm:h-[60px] sm:w-[60px] object-contain" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#001B2F]">
                            Strategic excellence
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </section>

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

            {/* Meet the team Section */}
            <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-24 bg-[#F8F9FA]">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-3 sm:mb-4 h-1 w-16 sm:w-20 bg-[#D9BB8E]" />
                    <p className="mb-4 sm:mb-6 text-base sm:text-lg font-medium text-slate-800">
                        Meet the team
                    </p>
                    <h2 className="max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#001B2F]">
                        Deep Knowledge,
                        <br />
                        Global Impact
                    </h2>
                </div>
            </section>

            {/* Team Grid Section */}
            <section className="px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-32 bg-[#F8F9FA]">
                <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                    {loading ? (
                        <div className="col-span-full text-center py-10">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-500">Loading team members...</p>
                        </div>
                    ) : leadership.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-slate-500">
                            No team members found.
                        </div>
                    ) : (
                        leadership.map((member) => (
                            <div key={member._id} className="flex flex-col gap-4 sm:gap-6">
                                <div className="w-full aspect-square overflow-hidden bg-[#E0E0E0] rounded-full">
                                    <img
                                        src={member.photo || '/images/dummyProfile.png'}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-[#001B2F]">{member.name}</h3>
                                        <p className="text-xs sm:text-sm text-slate-500">{member.designation}</p>
                                    </div>
                                    {member.socialLinks?.linkedin && (
                                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                                            <img src="/images/links2.png" alt="LinkedIn" className="h-5 sm:h-6 w-auto" />
                                        </a>
                                    )}
                                </div>

                                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
                                    {member.bio}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </section>



            {/* CTA Section */}
            <section className="pb-24 sm:pb-32 md:pb-40 lg:pb-48 bg-[#F8F9FA]">
                <div className="max-w-full relative px-4 sm:px-0">
                    {/* Background Image */}
                    <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg sm:rounded-none">
                        <img
                            src={images?.bottomImage || "/images/about3.png"}
                            alt="Truck driving into sunset"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating Card */}
                    <div className="bg-[#001B2F] p-4 sm:p-5 md:p-6 w-full max-w-lg relative sm:absolute sm:bottom-0 sm:left-4 md:left-8 lg:left-12 xl:left-24 -mt-10 sm:mt-0 sm:translate-y-1/4 md:translate-y-1/3 rounded-sm mx-0">
                        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                            Let's explore how Solved Imperium Ventures can simplify your global growth and bring your business to new markets.
                        </p>
                        <button
                            onClick={() => window.location.href = '/contact'}
                            className="bg-[#D9BB8E] text-slate-900 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded hover:bg-[#ceae7d] transition w-full sm:w-auto"
                        >
                            Contact us
                        </button>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-[#F8F9FA] px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28 text-center">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#001B2F]">
                        Ready to transform your global strategy?
                    </h2>
                    <p className="mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg text-slate-600">
                        Let's explore how Solved Imperium Ventures can simplify your global growth and bring your business to new markets.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                        <button
                            onClick={() => window.location.href = '/contact'}
                            className="rounded bg-[#001B2F] px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-opacity-90"
                        >
                            Contact us
                        </button>
                        <button
                            onClick={() => window.location.href = '/services'}
                            className="rounded border border-slate-400 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#001B2F] transition hover:bg-slate-200"
                        >
                            Explore solutions
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    );
};

export default About;
