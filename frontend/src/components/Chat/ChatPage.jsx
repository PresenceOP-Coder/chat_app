import { useState, useEffect, useRef } from 'react';
import useWebSocket from '../../hooks/useWebSocket';
import { getHistory } from '../../utils/api';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatPage({ user, onLogout }) {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const { connected, sendMessage } = useWebSocket(user, (message) => {
        setMessages((prev) => [...prev, { ...message, isNew: true }]);
    });

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const history = await getHistory();
                setMessages(history.map(msg => ({ ...msg, isNew: false })));
            } catch (error) {
                console.error('Error loading history:', error);
            }
        };

        loadHistory();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (text) => {
        if (text.trim() && connected) {
            sendMessage(text);
        }
    };

    return (
        <>
            <div className="animated-bg">
                <div className="glow-orb glow-orb-1" />
                <div className="glow-orb glow-orb-2" />
            </div>

            <div className="chat-container">
                <div className="chat-inner">
                    <Header user={user} connected={connected} onLogout={onLogout} />
                    <MessageList
                        messages={messages}
                        messagesEndRef={messagesEndRef}
                        currentUser={user}
                    />
                    <MessageInput onSend={handleSendMessage} disabled={!connected} />
                </div>
            </div>
        </>
    );
}

export default ChatPage;
