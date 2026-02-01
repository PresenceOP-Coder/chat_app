import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, LogOut, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

function Header({ user, connected, onLogout }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="glass px-6 py-4 flex justify-between items-center border-b border-black/5 dark:border-white/5 z-20">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg
                        ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
                        {user.charAt(0).toUpperCase()}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <div>
                    <h2 className="font-bold text-slate-800 dark:text-white">{user}</h2>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        {connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                        {connected ? 'Online' : 'Disconnected'}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-xl transition-colors font-medium"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </motion.button>
            </div>
        </div>
    );
}

export default Header;
