import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

function MessageInput({ onSend, disabled }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 glass border-t border-black/5 dark:border-white/5 z-20">
            <div className="relative flex items-center gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    disabled={disabled}
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500 dark:focus:border-purple-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                />
                <motion.button
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    disabled={disabled || !text.trim()}
                    className="absolute right-2 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-slate-400 disabled:to-slate-500 text-white shadow-lg shadow-blue-500/30 disabled:shadow-none"
                >
                    <Send className="w-4 h-4" />
                </motion.button>
            </div>
        </form>
    );
}

export default MessageInput;
