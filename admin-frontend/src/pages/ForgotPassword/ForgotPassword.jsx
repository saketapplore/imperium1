import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Mail, ChevronLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authService.forgotPassword(email);
            setIsSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4 selection:bg-primary-100 selection:text-primary-900">
                <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 lg:p-12 border border-white/50 animate-fade-in text-center">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Check your email</h1>
                    <p className="text-gray-600 font-medium mb-10 leading-relaxed">
                        We've sent a password reset link to <br />
                        <span className="text-primary-600 font-bold">{email}</span>
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-bold underline underline-offset-4 decoration-primary-200 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4 selection:bg-primary-100 selection:text-primary-900">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 lg:p-12 border border-white/50 animate-fade-in">
                <div className="mb-10">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm font-bold text-primary-600 hover:text-primary-700 mb-6 transition-colors group"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                        Back to Login
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Reset Password</h1>
                    <p className="text-gray-500 font-medium">Enter your email and we'll send you a link to reset your password.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        placeholder="admin@example.com"
                        error={error}
                        required
                        className="rounded-2xl"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                        className="h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/20 active:scale-95 transition-all"
                    >
                        {loading ? 'Sending link...' : 'Send Reset Link'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
