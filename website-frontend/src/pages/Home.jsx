import { useEffect, useState } from 'react';
import api from '../services/api';
import Footer from '../components/Footer';

const Home = () => {
  const [offerings, setOfferings] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Fetch home page content
    const fetchHomeContent = async () => {
      try {
        const response = await api.get('/content/home');
        if (response.data && response.data.data) {
          // Verify structure: backend returns { data: { hero: {}, offerings: [] } }
          // Based on content.controller.js lines 19-22: sendSuccess(res, 200, ..., { hero, offerings })
          // sendSuccess likely wraps it in { success: true, message: ..., data: { ... } }
          // So response.data.data.offerings is correct.
          if (response.data.data.offerings) {
            const sortedOfferings = [...response.data.data.offerings].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setOfferings(sortedOfferings);
          }
        }
      } catch (error) {
        console.error('Error fetching home content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  return (
    <>
      <section className="relative min-h-screen w-full text-white bg-[#001B2F] overflow-hidden rounded-b-[80px]">

        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/ihome1.png')] bg-cover bg-center bg-no-repeat opacity-40" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-8xl flex-col px-16 py-6">

          {/* Header */}
          <header className="flex items-center justify-between py-4 md:py-2">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/images/imlogo.png"
                alt="Solved Imperium Ventures logo"
                className="h-12 w-auto object-fill md:h-20"
              />
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-8 text-xs font-medium md:text-sm">
              <a href="/" className="text-white/80 hover:text-[#D9BB8E] transition">
                Home
              </a>
              <a href="/services" className="text-white/80 hover:text-[#D9BB8E] transition">
                Services
              </a>
              <a href="/about" className="text-white/80 hover:text-[#D9BB8E] transition">
                About us
              </a>

              <a href="/contact" className="rounded-md bg-[#D9BB8E] px-6 py-2.5 text-xs font-bold text-slate-900 hover:bg-[#c9aa7c] transition md:text-sm">
                Contact us
              </a>
            </nav>
          </header>

          {/* Hero Content */}
          <section className="flex flex-1 flex-col justify-center mt-[120px] py-10 md:py-[100px]">
            <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Tailored Solutions for
              <br />
              Global Growth.
            </h1>

            <p className="mb-10 max-w-xl text-sm leading-relaxed text-white/90 md:text-lg">
              Bespoke Private Labels, Global Trade Expertise, and <br /> Strategic Market Expansion.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="bg-[#D9BB8E] px-8 py-4 text-xs font-bold text-slate-900 hover:bg-[#c9aa7c] transition md:text-sm">
                Explore Solutions
              </button>

              <button className="border border-white px-8 py-4 text-xs font-bold text-white hover:bg-white/10 transition md:text-sm">
                Contact us
              </button>
            </div>

            {/* Service headings row */}
            <div className="mt-16 flex flex-wrap gap-x-8 gap-y-4 text-[8px] font-medium uppercase tracking-wider text-white/70 md:text-xs">
              <span>Private Label Development</span>
              <span>Import &amp; Export</span>
              <span>Market entry</span>
              <span>Distribution channel building</span>
              <span>Category management &amp; Sourcing</span>
            </div>
          </section>

        </div>
      </section>

      {/* About us section */}
      <section id="about" className="px-6 py-4 text-slate-900 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* Label */}
          <p className="mb-12 text-lg font-medium text-slate-900 md:text-2xl">
            About us
          </p>

          <div className="flex flex-col gap-0 md:flex-row">
            {/* Left column - headings */}
            <div className="w-full md:w-3/5 ">
              <h2 className="text-4xl font-bold leading-none text-[#001B2F] md:text-6xl lg:text-5xl">
                We don&apos;t just move goods.
              </h2>
              <h3 className="mt-3 text-3xl font-bold leading-none text-[#D9BB8E] md:text-4xl lg:text-5xl">
                We move markets.
              </h3>
            </div>

            {/* Right column - description */}
            <div className="w-full md:w-[50%] md:mt-32">
              <div className="flex text-xs leading-relaxed text-slate-600 md:text-[18px]">
                <p>
                  At Solved Imperium Ventures, we turn complexity into clarity and transform opportunities into commercial success. Whether expanding globally or entering a new market, we act as a trusted partner across every step pf the supply chain.
                  With a team of seasoned professionals in different continents, we streaming import/export operations, building strategic global distribution networks to crafting bespoke private label solutions. From concept to container, we deliver tailored results, no matter the category or market.
                </p>

              </div>

              {/* Arrow button */}
              <button
                type="button"
                className="mt-6 text-2xl font-medium text-slate-900 transition hover:translate-x-2"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image-only section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <img
          src="/images/ihome4.png"
          alt="Solved Imperium services overview"
          className="w-full h-auto object-fill"
        />
      </section>

      {/* Our Services grid section */}
      <section id="services" className="px-6 py-16 text-slate-900 md:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 md:items-stretch">
          {/* Left column - image */}
          <div className="overflow-hidden rounded-md bg-white shadow-sm">
            <img
              src="/images/ihome6.png"
              alt="Business meeting illustrating services"
              className="h-[760px] w-full object-cover"
            />
          </div>

          {/* Right column - service list */}
          <div className="flex flex-col gap-6">

            <div className="space-y-6 text-slate-900">
              {loading ? (
                <div className="py-10 text-center">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Loading services...</p>
                </div>
              ) : offerings.length === 0 ? (
                <p className="py-10 text-center text-slate-500 italic">No services found.</p>
              ) : (
                offerings.map((offering, index) => (
                  <div key={offering._id} className={index !== 0 ? "border-t border-slate-200 pt-6" : ""}>
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                      className={`flex w-full ${expandedIndex === index ? 'items-start' : 'items-center'} justify-between gap-4 text-left group`}
                    >
                      <div>
                        <span className="title-h2-reg block">
                          {offering.title}
                        </span>

                        {/* Description - Accordion style */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                          <div className="overflow-hidden">
                            <p className="text-[11px] leading-relaxed text-slate-600 md:text-xs pr-4">
                              {offering.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <span className={`text-base text-slate-500 transition-transform duration-300 ${expandedIndex === index ? 'rotate-90' : ''}`}>
                        ↗
                      </span>
                    </button>
                  </div>
                ))
              )}
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
            <button className="bg-[#D9BB8E] px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#ceae7d]">
              Explore Solutions
            </button>
            <button className="border border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Contact us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
