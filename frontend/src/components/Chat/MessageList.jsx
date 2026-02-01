import { motion, AnimatePresence } from 'framer-motion';

function MessageList({ messages, messagesEndRef, currentUser }) {
    return (
        <div className="h-full overflow-y-auto p-4 space-y-4 scroll-smooth">
            <AnimatePresence initial={false}>
                {messages.map((msg, index) => {
                    const isOwnMessage = msg.username === currentUser;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                                max-w-[70%] p-3 rounded-2xl shadow-sm backdrop-blur-sm
                                ${isOwnMessage
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-white/80 dark:bg-slate-700/80 text-slate-800 dark:text-slate-100 rounded-bl-none'}
                            `}>
                                {!isOwnMessage && (
                                    <p className="text-xs font-bold mb-1 opacity-70 text-purple-600 dark:text-purple-400">
                                        {msg.username}
                                    </p>
                                )}
                                <p className="leading-relaxed">{msg.content}</p>
                                <p className={`text-[10px] mt-1 text-right opacity-60 ${isOwnMessage ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {new Date(msg.send_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;
