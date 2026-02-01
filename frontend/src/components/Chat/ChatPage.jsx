import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useWebSocket from '../../hooks/useWebSocket';
import { getHistory } from '../../utils/api';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import AnimatedBackground from '../UI/AnimatedBackground';

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
        <div className="relative flex flex-col h-screen overflow-hidden">
            <AnimatedBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass relative z-10 flex flex-col h-full m-4 rounded-2xl shadow-2xl overflow-hidden border border-white/20"
            >
                <Header user={user} connected={connected} onLogout={onLogout} />

                <div className="flex-1 overflow-hidden relative">
                    <MessageList
                        messages={messages}
                        messagesEndRef={messagesEndRef}
                        currentUser={user}
                    />
                </div>

                <MessageInput onSend={handleSendMessage} disabled={!connected} />
            </motion.div>
        </div>
    );
}

export default ChatPage;
