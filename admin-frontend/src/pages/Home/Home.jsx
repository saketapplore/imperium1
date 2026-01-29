import { Link } from 'react-router-dom';
import {
    ChevronRight,
    Zap,
    ShieldCheck,
    Smartphone,
    Palette
} from 'lucide-react';
import Button from '../../components/common/Button';

const Home = () => {
    return (
        <div className="min-h-screen bg-white overflow-hidden selection:bg-primary-100 selection:text-primary-900">
            {/* Header / Nav */}
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-2 group cursor-pointer">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-gray-900">IMPERIUM</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">
                            Sign In
                        </Link>
                        <Link to="/login">
                            <Button variant="primary" className="shadow-lg shadow-primary-600/20">
                                Launch Portal
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 lg:px-8 bg-gradient-to-b from-primary-50/50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center space-x-2 bg-primary-100/50 text-primary-700 px-4 py-2 rounded-full mb-8 animate-fade-in border border-primary-100 text-sm font-bold uppercase tracking-wider">
                                <Zap className="w-4 h-4 fill-primary-600 text-primary-600" />
                                <span>Enterprise Ready</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight animate-slide-up">
                                Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Empire</span> <br className="hidden lg:block" /> with confidence.
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in [animation-delay:200ms]">
                                The all-in-one administrative suite designed for speed, security, and scalability. Take control of your data like never before.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in [animation-delay:400ms]">
                                <Link to="/login">
                                    <Button variant="primary" size="lg" className="h-14 px-8 rounded-2xl w-full sm:w-auto text-lg">
                                        Admin Access <ChevronRight className="ml-2 w-5 h-5 inline" />
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl w-full sm:w-auto text-lg border-gray-200 text-gray-700">
                                        View Demo
                                    </Button>
                                </Link>
                            </div>

                            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-gray-400 animate-fade-in [animation-delay:600ms]">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-primary-500 transition-all cursor-pointer">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-medium">Joined by <span className="text-gray-900">500+</span> teams this month</p>
                            </div>
                        </div>

                        <div className="relative animate-fade-in [animation-delay:400ms]">
                            <div className="relative z-10 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                                <div className="bg-gray-900 p-4 flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="p-4 lg:p-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div className="h-40 bg-primary-50 rounded-2xl animate-pulse"></div>
                                            <div className="h-24 bg-gray-50 rounded-2xl"></div>
                                        </div>
                                        <div className="space-y-4 pt-8">
                                            <div className="h-24 bg-indigo-50 rounded-2xl"></div>
                                            <div className="h-40 bg-gray-50 rounded-2xl animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Blobs */}
                            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-200 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
                            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30 animate-blob [animation-delay:2s]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50 px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Everything you need to scale</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Built with the modern stack to ensure your application performs at its peak availability and security.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Lightning Fast', desc: 'Built with Vite and React for near-instant responses.', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                        { title: 'Enterprise Security', desc: 'JWT & OAuth protection for all your sensitive data.', icon: ShieldCheck, color: 'text-primary-600', bg: 'bg-primary-50' },
                        { title: 'Mobile First', desc: 'Responsive design that works on any device sized screen.', icon: Smartphone, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { title: 'Premium UI', desc: 'Crafted with Tailwind CSS for a beautiful look and feel.', icon: Palette, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-primary-100 hover:-translate-y-2 group">
                            <div className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
