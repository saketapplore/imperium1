import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [offerings, setOfferings] = useState([]);
  const [hero, setHero] = useState(null);
  const [imageSection, setImageSection] = useState(null);
  const [serviceSection, setServiceSection] = useState(null);
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
          const { hero, offerings, imageSection, serviceSection } = response.data.data;

          if (offerings) {
            const sortedOfferings = [...offerings].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setOfferings(sortedOfferings);
          }

          if (hero) {
            setHero(hero);
          }

          if (imageSection) {
            setImageSection(imageSection);
          }

          if (serviceSection) {
            setServiceSection(serviceSection);
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
      <section className="relative min-h-screen w-full text-white bg-[#001B2F] overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${hero?.backgroundImage || '/images/ihome1.png'})` }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-8xl flex-col">
          <Navbar transparent={true} />
          <div className="flex flex-col px-4 py-4 sm:px-8 md:px-12 lg:px-16 md:py-6 flex-1">


            {/* Hero Content */}
            <section className="flex flex-1 flex-col justify-center mt-8 sm:mt-16 md:mt-[120px] py-6 sm:py-10 md:py-[100px]">
              <h1
                className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight"
                style={{ whiteSpace: 'pre-line' }}
              >
                {hero?.headline || 'Tailored Solutions for\nGlobal Growth.'}
              </h1>

              <p
                className="mb-6 sm:mb-8 md:mb-10 max-w-xl text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/90"
                style={{ whiteSpace: 'pre-line' }}
              >
                {hero?.subtext || 'Bespoke Private Labels, Global Trade Expertise, and\nStrategic Market Expansion.'}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5">
                <button
                  onClick={() => window.location.href = hero?.primaryCTA?.link || '/services'}
                  className="bg-[#D9BB8E] px-6 py-3 sm:px-8 sm:py-4 text-xs font-bold text-slate-900 hover:bg-[#c9aa7c] transition md:text-sm text-center"
                >
                  {hero?.primaryCTA?.text || 'Explore Solutions'}
                </button>

                <button
                  onClick={() => window.location.href = hero?.secondaryCTA?.link || '/contact'}
                  className="border border-white px-6 py-3 sm:px-8 sm:py-4 text-xs font-bold text-white hover:bg-white/10 transition md:text-sm text-center"
                >
                  {hero?.secondaryCTA?.text || 'Contact us'}
                </button>
              </div>

              {/* Service headings row */}
              <div className="mt-8 sm:mt-12 md:mt-16 flex flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-4 text-[7px] sm:text-[8px] md:text-[9px] lg:text-xs font-medium uppercase tracking-wider text-white/70">
                <span>Import &amp; Export</span>
                <span>Market entry</span>
                <span>Distribution channel building</span>
                <span>Category management &amp; Sourcing</span>
                <span>Private Label Development</span>
              </div>
            </section>

          </div>
        </div>
      </section>

      {/* About us section */}
      <section id="about" className="px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:pt-20 text-slate-900">
        <div className="mx-auto w-full max-w-7xl">
          {/* Label */}
          <p className="mb-6 sm:mb-8 md:mb-12 text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-slate-900">
            About us
          </p>

          <div className="flex flex-col md:flex-row gap-6 md:gap-0">
            {/* Left column - headings */}
            <div className="w-full md:w-3/5">
              <h4 className="text-4xl sm:text-xl md:text-4xl lg:text-5xl xl:text-5xl font-bold leading-none text-[#001B2F]">
                We don&apos;t just move goods.
              </h4>
              <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-none text-[#D9BB8E]">
                We move markets.
              </h3>
            </div>

            {/* Right column - description */}
            <div className="w-full md:w-[50%] md:mt-32 md:-ml-48">
              <div className="flex text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] leading-relaxed text-slate-600">
                <p>
                  At Solved Imperium Ventures, we turn complexity into clarity and transform opportunities into commercial success. Whether expanding globally or entering a new market, we act as a trusted partner across every step pf the supply chain.
                  With a team of seasoned professionals in different continents, we streaming import/export operations, building strategic global distribution networks to crafting bespoke private label solutions. From concept to container, we deliver tailored results, no matter the category or market.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image-only section */}
      {(!imageSection || imageSection.isActive) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
          <img
            src={imageSection?.image || "/images/ihome4.png"}
            alt="Solved Imperium services overview"
            className="w-full h-auto object-cover rounded-lg md:rounded-none"
          />
        </section>
      )}

      {/* Our Services grid section */}
      <section id="services" className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-24 text-slate-900">
        <h1 className="text-2xl sm:text-3xl md:text-4xl leading-none text-[#001B2F] ml-0 sm:ml-8 md:ml-16 lg:ml-24 mb-6 sm:mb-8 md:mb-10">Our Services</h1>
        <div className="mx-auto grid w-full max-w-7xl gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 md:items-stretch">
          {/* Left column - image */}
          <div className="overflow-hidden rounded-lg md:rounded-none">
            <img
              src={serviceSection?.sideImage || "/images/ihome6.png"}
              alt="Business meeting illustrating services"
              className="h-[300px] sm:h-[400px] md:h-[600px] lg:h-[760px] w-full object-cover"
            />
          </div>

          {/* Right column - service list */}
          <div className="flex flex-col gap-4 sm:gap-6">

            <div className="space-y-4 sm:space-y-6 text-slate-900">
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
                  <div key={offering._id} className={index !== 0 ? "border-t border-slate-200 pt-4 sm:pt-6" : ""}>
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                      className={`flex w-full ${expandedIndex === index ? 'items-start' : 'items-center'} justify-between gap-3 sm:gap-4 text-left group`}
                    >
                      <div className="flex-1">
                        <span className="title-h2-reg block text-sm sm:text-base md:text-lg">
                          {offering.title}
                        </span>

                        {/* Description - Accordion style */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100 mt-2 sm:mt-3' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                          <div className="overflow-hidden">
                            <p className="text-[10px] sm:text-[11px] md:text-xs leading-relaxed text-slate-600 pr-2 sm:pr-4">
                              {offering.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <span className={`text-sm sm:text-base text-slate-500 transition-transform duration-300 flex-shrink-0 ${expandedIndex === index ? 'rotate-90' : ''}`}>
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
              className="bg-[#D9BB8E] px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold text-slate-900 transition hover:bg-[#ceae7d]"
            >
              Explore Solutions
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="border border-white px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10"
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

export default Home;
