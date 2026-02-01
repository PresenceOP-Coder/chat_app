import { getAvatarColor, getUserInitials, formatTime } from '../../utils/helpers';

function MessageItem({ message }) {
    const username = message.username || 'User';
    const content = message.content || '';
    const timestamp = message.send_at || message.sencd_at || new Date();

    const avatarColor = getAvatarColor(username);
    const initials = getUserInitials(username);
    const time = formatTime(timestamp);

    return (
        <li className="message-item">
            <div
                className="message-avatar"
                style={{ background: avatarColor }}
                title={username}
            >
                {initials}
            </div>

            <div className="message-content">
                <div className="message-bubble">
                    <div className="message-username">{username}</div>
                    <div className="message-text">{content}</div>
                </div>
                <div className="message-time">{time}</div>
            </div>
        </li>
    );
}

export default MessageItem;
