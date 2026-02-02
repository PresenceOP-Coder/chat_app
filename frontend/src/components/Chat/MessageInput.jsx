import { useState } from 'react';
import { Send } from 'lucide-react';

function MessageInput({ onSend, disabled }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSend(text);
            setText('');
        }
    };

    return (
        <div className="message-input-container">
            <form onSubmit={handleSubmit} className="input-wrapper">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    disabled={disabled}
                    className="message-input"
                />
                <button
                    type="submit"
                    disabled={disabled || !text.trim()}
                    className="send-button"
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
}

export default MessageInput;
