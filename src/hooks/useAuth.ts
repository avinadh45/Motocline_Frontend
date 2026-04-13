import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthService } from '../service/AuthService';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

export function useAuth() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token && window.location.pathname !== '/dashboard') {
            navigate('/dashboard');
        }
    }, [navigate]);

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        try {
            await authService.register({ email, password, name, phoneNumber });
            navigate('/verify');
            setSuccess('Registration successful! Please verify the OTP sent to your email.');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const handleVerify = async (otpValue:string) => {
        
        clearMessages();
        try {
            await authService.verifyOtp({ email, otp:otpValue });
            navigate("/dashboard");
            setSuccess('OTP verified successfully! You can now login.');
        } catch (err: any) {
           setError(err.response?.data?.message || err.message);
          throw err;
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        try {
            await authService.login({ email, password });
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const logout = () => {
        authService.logout();
        navigate('/login');
        setEmail('');
        setPassword('');
        setOtp('');
    };

    const handleResendOtp = async()=>{
        clearMessages()
        try {
           await authService.resendOtp(email)
           setSuccess("Otp resent successfull") 
        } catch (err:any) {
            setError(err.response?.data?.message || err.message)
        }
    }
    return {
        email, setEmail,
        password, setPassword,
        name, setName,
        phoneNumber, setPhoneNumber,
        otp, setOtp,
        error, setError,
        success, setSuccess,
        handleRegister,
        handleVerify,
        handleLogin,
        logout,
        clearMessages,
        handleResendOtp
    };
}
