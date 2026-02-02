import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, LogOut, Wifi, WifiOff } from 'lucide-react';

function Header({ user, connected, onLogout }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="chat-header">
            <div className="flex items-center gap-3">
                <div style={{ position: 'relative' }}>
                    <div className="user-avatar">
                        {user.charAt(0).toUpperCase()}
                        <span className={`status-indicator ${connected ? 'status-online' : 'status-offline'}`} />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>{user}</h2>
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {connected ? <Wifi size={12} /> : <WifiOff size={12} />}
                        {connected ? 'Online' : 'Disconnected'}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'dark' ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#0f172a" />}
                </button>

                <button onClick={onLogout} className="logout-btn">
                    <LogOut size={16} />
                    <span style={{ display: 'none' }} className="sm-inline">Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Header;

// Add responsive styles
const style = document.createElement('style');
style.textContent = `
    @media (min-width: 640px) {
        .sm-inline {
            display: inline !important;
        }
    }
`;
document.head.appendChild(style);
