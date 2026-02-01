import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const AnimatedBackground = () => {
    const { theme } = useTheme();

    const isDark = theme === 'dark';

    // Particle configuration
    const particleCount = 20;
    const particles = Array.from({ length: particleCount });

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Gradient Mesh */}
            <div className={`absolute inset-0 transition-colors duration-1000 ${isDark
                    ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
                    : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
                }`} />

            {/* Glowing Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]"
                style={{
                    background: isDark ? 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' : 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
                }}
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]"
                style={{
                    background: isDark ? 'radial-gradient(circle, #2563eb 0%, transparent 70%)' : 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
                }}
            />

            {/* Floating Particles for 'React Bits' feel */}
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0,
                    }}
                    animate={{
                        y: [null, Math.random() * window.innerHeight],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    }}
                />
            ))}
        </div>
    );
};

export default AnimatedBackground;
