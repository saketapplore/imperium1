import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { ShieldCheck, ChevronLeft, CheckCircle2, Lock } from 'lucide-react';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            await authService.resetPassword(token, formData.password);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setErrors({
                submit: error.response?.data?.message || 'Failed to reset password. The link may be expired.',
            });
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4 selection:bg-primary-100 selection:text-primary-900">
                <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 lg:p-12 border border-white/50 animate-fade-in text-center">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Password Reset!</h1>
                    <p className="text-gray-600 font-medium mb-10 leading-relaxed">
                        Your password has been successfully reset. <br />
                        You will be redirected to the login page shortly.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-bold underline underline-offset-4 decoration-primary-200 transition-colors"
                    >
                        Click here if not redirected
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4 selection:bg-primary-100 selection:text-primary-900">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 lg:p-12 border border-white/50 animate-fade-in">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-600/20">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">New Password</h1>
                    <p className="text-gray-500 font-medium">Please enter your new password below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="New Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        error={errors.password}
                        required
                        className="rounded-2xl"
                    />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        error={errors.confirmPassword}
                        required
                        className="rounded-2xl"
                    />

                    {errors.submit && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold animate-shake">
                            {errors.submit}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                        className="h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/20 active:scale-95 transition-all"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
