import { useEffect, useState } from 'react';
import api from '../services/api';
import Footer from '../components/Footer';

const About = () => {
    const [leadership, setLeadership] = useState([]);
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

            {/* About Us Hero Section */}
            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 h-0.5 w-14 bg-[#D9BB8E]" />
                    <p className="mb-6 text-md font-medium text-slate-800">
                        About us
                    </p>
                    <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[#001B2F] md:text-5xl lg:text-6xl mb-8">
                        We don't just move goods.
                        <br />
                        <span style={{ color: '#D4B684', fontFamily: 'Urbanist', fontSize: '61px', fontStyle: 'normal', fontWeight: '700', lineHeight: '120%' }}>
                            We move markets.
                        </span>
                    </h1>
                    <p className="max-w-3xl text-md leading-relaxed text-slate-700 md:text-base lg:text-xl">
                        At Solved Imperium Ventures, we turn complexity into clarity and transform opportunities into commercial success. Whether expanding globally or entering a new market, we act as a trusted partner across every step pf the supply chain.
                        With a team of seasoned professionals in different continents, we streaming import/export operations, building strategic global distribution networks to crafting bespoke private label solutions. From concept to container, we deliver tailored results, no matter the category or market.
                    </p>
                </div>
            </section>

            {/* Image & Card Section */}
            <section className="px-6 pb-16 md:pb-24">
                <div className="mx-auto max-w-7xl relative">
                    {/* Background Image */}
                    <div className="w-full h-[250px] md:h-[320px] lg:h-[420px] overflow-hidden">
                        <img
                            src="/images/about2.png"
                            alt="Team collaboration"
                            className="w-full h-full object-fill"
                        />
                    </div>

                    {/* Floating Card */}
                    <div className="bg-[#EBDDC6] p-4  max-w-lg relative md:absolute md:-top-12 md:right-12 lg:-top-16 lg:right-24 mt-[-60px] md:mt-0 mx-2 md:mx-0">
                        <p className="text-[#000B14] w-[400px] text-base md:text-lg leading-relaxed font-medium mb-8">
                            Whether you're expanding globally, entering a
                            new market, or streamlining operations, we
                            provide the expertise and network to make it
                            happen.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-[#001B2F] rounded text-white px-6 py-3 text-sm font-semibold hover:bg-opacity-90 transition">
                                Explore Solutions
                            </button>
                            <button className="bg-[#546A7B] rounded text-white px-6 py-3 text-sm font-semibold hover:bg-opacity-90 transition">
                                Contact us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 h-1 w-20 bg-[#D9BB8E]" />
                    <p className="mb-6 text-xl font-medium text-slate-800">
                        Our Values
                    </p>
                    <h2 className="max-w-2xl text-4xl font-bold leading-tight text-[#001B2F] md:text-5xl lg:text-6xl">
                        The Values That <br /> Guide Every Decision
                    </h2>
                </div>
            </section>

            {/* Values Grid Section */}
            <section className="px-6 pb-20 md:pb-32">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Item 1: Reliable */}
                    <div className="flex flex-col items-start gap-6">
                        <div className="h-20 w-20">
                            <img src="/images/reliable.png" alt="Reliable icon" className="h-[60px] w-[60px] object-fill" />
                        </div>
                        <h3 className="text-xl font-bold text-[#001B2F] md:text-2xl">
                            Reliable
                        </h3>
                        <p className="text-xl leading-relaxed text-slate-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Item 2: Global Reach */}
                    <div className="flex flex-col items-start gap-6">
                        <div className="h-20 w-20">
                            <img src="/images/global.png" alt="Global icon" className="h-[60px] w-[60px] object-fill" />
                        </div>
                        <h3 className="text-xl font-bold text-[#001B2F] md:text-2xl">
                            Global Reach
                        </h3>
                        <p className="text-xl leading-relaxed text-slate-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Item 3: Strategic Excellence */}
                    <div className="flex flex-col items-start gap-6">
                        <div className="h-20 w-20">
                            <img src="/images/strategic.png" alt="Strategic icon" className="h-[60px] w-[60px] object-fill" />
                        </div>
                        <h3 className="text-xl font-bold text-[#001B2F] md:text-2xl">
                            Strategic excellence
                        </h3>
                        <p className="text-xl leading-relaxed text-slate-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
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

            {/* Meet the team Section */}
            <section className="px-6 py-16 md:py-24 bg-[#F8F9FA]">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 h-1 w-20 bg-[#D9BB8E]" />
                    <p className="mb-6 text-lg font-medium text-slate-800">
                        Meet the team
                    </p>
                    <h2 className="max-w-4xl text-4xl font-bold leading-tight text-[#001B2F] md:text-5xl lg:text-6xl">
                        Deep Knowledge,
                        <br />
                        Global Impact
                    </h2>
                </div>
            </section>

            {/* Team Grid Section */}
            <section className="px-6 pb-20 md:pb-32 bg-[#F8F9FA]">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
                    {loading ? (
                        <div className="col-span-3 text-center py-10">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-500">Loading team members...</p>
                        </div>
                    ) : leadership.length === 0 ? (
                        <div className="col-span-3 text-center py-10 text-slate-500">
                            No team members found.
                        </div>
                    ) : (
                        leadership.map((member) => (
                            <div key={member._id} className="flex flex-col gap-6">
                                <div className="w-full aspect-square overflow-hidden bg-[#E0E0E0] rounded-full">
                                    <img
                                        src={member.photo || '/images/dummyProfile.png'}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#001B2F]">{member.name}</h3>
                                        <p className="text-sm text-slate-500">{member.designation}</p>
                                    </div>
                                    {member.socialLinks?.linkedin && (
                                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                                            <img src="/images/links2.png" alt="LinkedIn" className="h-6 w-auto" />
                                        </a>
                                    )}
                                </div>

                                <p className="text-xs leading-relaxed text-slate-600 text-justify">
                                    {member.bio}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </section>



            {/* CTA Section */}
            <section className="pb-12 md:pb-20 bg-[#F8F9FA]">
                <div className="max-w-full relative">
                    {/* Background Image */}
                    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                        <img
                            src="/images/about3.png"
                            alt="Truck driving into sunset"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating Card */}
                    <div className="bg-[#001B2F] p-4 md:p-6 max-w-lg absolute bottom-0 left-0 md:left-12 lg:left-24 translate-y-1/4 md:translate-y-1/3 rounded-sm">
                        <p className="text-white text-base md:text-xl leading-relaxed mb-8">
                            Let’s explore how Solved Imperium Ventures can simplify your global growth and bring your business to new markets.
                        </p>
                        <button className="bg-[#D9BB8E] text-slate-900 px-8 py-3 text-sm font-semibold rounded hover:bg-[#ceae7d] transition">
                            Contact us
                        </button>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-[#F8F9FA] px-6 p-28 text-center">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-6 text-3xl font-bold text-[#001B2F] md:text-5xl">
                        Ready to transform your global strategy?
                    </h2>
                    <p className="mb-10 text-base text-slate-600 md:text-lg">
                        Let's explore how Solved Imperium Ventures can simplify your global growth and bring your business to new markets.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="rounded bg-[#001B2F] px-8 py-3 text-sm font-semibold text-white transition hover:bg-opacity-90">
                            Contact us
                        </button>
                        <button className="rounded border border-slate-400 px-8 py-3 text-sm font-semibold text-[#001B2F] transition hover:bg-slate-200">
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
