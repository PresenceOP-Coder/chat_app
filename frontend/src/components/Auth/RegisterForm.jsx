import { useState } from 'react';
import { register } from '../../utils/api';

function RegisterForm({ onSwitchToLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            await register(username, password);
            setSuccess('Account created! Switching to login...');
            setTimeout(() => {
                onSwitchToLogin();
            }, 1500);
        } catch (error) {
            if (error.message.includes('taken')) {
                setErrors({ username: 'Username already taken' });
            } else {
                setErrors({ username: error.message || 'Registration failed' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
                <label className="form-label" htmlFor="registerUsername">
                    Username
                </label>
                <input
                    type="text"
                    id="registerUsername"
                    className={`form-input ${errors.username ? 'error' : ''}`}
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className="error-message">{errors.username}</div>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="registerPassword">
                    Password
                </label>
                <input
                    type="password"
                    id="registerPassword"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="registerConfirmPassword">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="registerConfirmPassword"
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
            </button>
        </form>
    );
}

export default RegisterForm;
