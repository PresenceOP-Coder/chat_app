import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthPage({ onLogin }) {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">💬</div>
                        <h1 className="auth-title">ChatFlow</h1>
                        <p className="auth-subtitle">Connect and chat in real-time</p>
                    </div>

                    <div className="auth-tabs">
                        <button
                            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                        >
                            Sign Up
                        </button>
                    </div>

                    {activeTab === 'login' ? (
                        <LoginForm onLogin={onLogin} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
