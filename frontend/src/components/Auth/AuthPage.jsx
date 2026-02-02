import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className="animated-bg">
                <div className="glow-orb glow-orb-1" />
                <div className="glow-orb glow-orb-2" />
            </div>

            <div className="page-container">
                <div className="auth-card">
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 20 }}>
                        <button onClick={toggleTheme} className="theme-toggle-btn">
                            {theme === 'dark' ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#0f172a" />}
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            ChatVerse
                        </h1>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {isLogin ? 'Welcome back!' : 'Join the conversation'}
                        </p>
                    </div>

                    {isLogin ? (
                        <LoginForm onLogin={onLogin} />
                    ) : (
                        <RegisterForm onSwitch={() => setIsLogin(true)} />
                    )}

                    <div className="mt-6 text-center">
                        <button
                            className="link-button"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthPage;
