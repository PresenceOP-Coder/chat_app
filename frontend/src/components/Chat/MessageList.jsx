function MessageList({ messages, messagesEndRef, currentUser }) {
    const formatTime = (dateStr) => {
        try {
            const date = new Date(dateStr);
            return isNaN(date.getTime())
                ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return '';
        }
    };

    return (
        <div className="message-list">
            {messages.map((msg, index) => {
                const isOwnMessage = msg.username === currentUser;

                return (
                    <div
                        key={index}
                        className="flex"
                        style={{ justifyContent: isOwnMessage ? 'flex-end' : 'flex-start' }}
                    >
                        <div className={`message-bubble ${isOwnMessage ? 'message-own' : 'message-other'}`}>
                            {!isOwnMessage && (
                                <p className="text-xs font-semibold mb-1" style={{
                                    opacity: 0.7,
                                    color: 'var(--accent-secondary)'
                                }}>
                                    {msg.username}
                                </p>
                            )}
                            <p style={{ lineHeight: '1.6' }}>{msg.content}</p>
                            <p className="text-xs mt-1 text-right opacity-60">
                                {formatTime(msg.send_at)}
                            </p>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;
