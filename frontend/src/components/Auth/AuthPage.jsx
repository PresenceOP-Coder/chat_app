import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import AnimatedBackground from '../UI/AnimatedBackground';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden text-center">
            <AnimatedBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="glass w-full max-w-md p-8 rounded-2xl shadow-2xl z-10 relative backdrop-blur-xl border border-white/20"
            >
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                    </button>
                </div>

                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        ChatVerse
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        {isLogin ? 'Welcome back!' : 'Join the conversation'}
                    </p>
                </motion.div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={isLogin ? 'login' : 'register'}
                        initial={{ x: isLogin ? -20 : 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: isLogin ? 20 : -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isLogin ? (
                            <LoginForm onLogin={onLogin} />
                        ) : (
                            <RegisterForm onSwitch={() => setIsLogin(true)} />
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-6 text-center">
                    <button
                        className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors underline underline-offset-4"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default AuthPage;
