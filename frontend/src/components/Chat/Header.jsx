function Header({ user, connected, onLogout }) {
    return (
        <header className="chat-header">
            <div className="header-left">
                <div className="app-logo">💬</div>
                <h1 className="app-title">ChatFlow</h1>
            </div>

            <div className="header-right">
                <div className="connection-status">
                    <span className={`status-dot ${connected ? 'connected' : ''}`}></span>
                    <span>{connected ? `Connected as ${user}` : 'Disconnected'}</span>
                </div>

                <button className="logout-button" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
