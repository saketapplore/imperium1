const Footer = () => {
    return (
        <footer className="w-full bg-[#001B2F] px-6 py-12 text-white md:py-16">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-start">
                {/* Left Column - Logo */}
                <div className="flex-shrink-0">
                    <img
                        src="/images/logoleft.svg"
                        alt="Solved Imperium Ventures"
                        className="h-16 w-auto object-fill md:h-36"
                    />
                </div>

                {/* Right Column - Navigation & Info */}
                <div className="flex w-full flex-col gap-0 md:w-auto md:items-end">

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap gap-8 text-sm font-light text-white/90 md:justify-end">
                        <a href="/about" className="hover:text-amber-300 transition">About us</a>
                        <a href="/services" className="hover:text-amber-300 transition">Services</a>
                        <a href="/contact" className="hover:text-amber-300 transition">Contact us</a>
                    </nav>

                    {/* Social Icons */}
                    <div className="flex gap-4 md:justify-end mt-8">
                        {/* X (Twitter) Icon */}
                        <a href="#" className="flex h-8 w-8 items-center justify-center rounded-sm bg-transparent hover:opacity-80 transition">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.241 12.876L1.095 2.25H7.952L12.812 8.674L18.244 2.25ZM17.087 19.769H18.92L6.645 4.126H4.664L17.087 19.769Z" fill="white" />
                            </svg>
                        </a>
                        <a href="#" className="flex h-8 w-8 items-center justify-center rounded-sm hover:opacity-80 transition">
                            <img src="/images/link1.png" alt="LinkedIn" className="h-6 w-6" />
                        </a>
                        <a href="#" className="flex h-8 w-8 items-center justify-center rounded-sm hover:opacity-80 transition">
                            <img src="/images/insta1.png" alt="Instagram" className="h-6 w-6" />
                        </a>
                    </div>

                    {/* Bottom Row - Copyright & Legal */}
                    <div className="mt-8 flex flex-col flex-wrap gap-x-8 gap-y-4 text-sm text-[#F5F7FA] font-['Inter'] leading-[1.2] font-normal md:flex-row md:items-center md:justify-end">
                        <span>© 2026 Solved Imperium Ventures. All rights reserved.</span>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition">Terms of Service</a>
                            <a href="#" className="hover:text-white transition">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
