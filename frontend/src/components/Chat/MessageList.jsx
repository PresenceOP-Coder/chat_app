import MessageItem from './MessageItem';

function MessageList({ messages, messagesEndRef }) {
    return (
        <div className="messages-container">
            <ul className="messages-list">
                {messages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                ))}
            </ul>
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;
