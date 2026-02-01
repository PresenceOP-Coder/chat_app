import { useState } from 'react';
import { login } from '../../utils/api';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess('');

        // Validation
        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await login(username, password);
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                onLogin(username);
            }, 500);
        } catch (error) {
            if (error.message.includes('not found')) {
                setErrors({ username: 'User not found' });
            } else if (error.message.includes('password')) {
                setErrors({ password: 'Incorrect password' });
            } else {
                setErrors({ password: error.message || 'Login failed' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
                <label className="form-label" htmlFor="loginUsername">
                    Username
                </label>
                <input
                    type="text"
                    id="loginUsername"
                    className={`form-input ${errors.username ? 'error' : ''}`}
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className="error-message">{errors.username}</div>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="loginPassword">
                    Password
                </label>
                <input
                    type="password"
                    id="loginPassword"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
    );
}

export default LoginForm;
