import { useState, useEffect } from 'react';
import AuthPage from './components/Auth/AuthPage';
import ChatPage from './components/Chat/ChatPage';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('chat_user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('chat_user', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('chat_user');
    setUser(null);
  };

  return (
    <>
      {user ? (
        <ChatPage user={user} onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
