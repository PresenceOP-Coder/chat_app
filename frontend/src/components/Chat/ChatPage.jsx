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
        // Handle incoming message
        setMessages((prev) => [...prev, { ...message, isNew: true }]);
    });

    useEffect(() => {
        // Load message history
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
        // Scroll to bottom when new messages arrive
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (text) => {
        if (text.trim() && connected) {
            sendMessage(text);
        }
    };

    return (
        <div className="chat-page">
            <Header user={user} connected={connected} onLogout={onLogout} />

            <div className="chat-main">
                <MessageList messages={messages} messagesEndRef={messagesEndRef} />
                <MessageInput onSend={handleSendMessage} disabled={!connected} />
            </div>
        </div>
    );
}

export default ChatPage;
