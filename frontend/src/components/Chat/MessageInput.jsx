import { useState } from 'react';

function MessageInput({ onSend, disabled }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form className="input-container" onSubmit={handleSubmit}>
            <input
                type="text"
                className="message-input"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disabled}
            />
            <button
                type="submit"
                className="send-button"
                disabled={disabled || !message.trim()}
            >
                Send
            </button>
        </form>
    );
}

export default MessageInput;
