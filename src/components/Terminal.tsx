import { ReactNode } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

interface TerminalProps {
  children: ReactNode;
  title?: string;
}

export function Terminal({ children, title = "portfolio.exe" }: TerminalProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-b from-purple-100 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-lg shadow-2xl border-4 border-purple-300 dark:border-purple-700 overflow-hidden transition-colors duration-300">
        {/* Window Title Bar */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-700 dark:to-pink-700 px-4 py-3 flex items-center justify-between border-b-4 border-purple-300 dark:border-purple-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400 border-2 border-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-green-500"></div>
            </div>
          </div>
          <div className="text-white font-mono flex-1 text-center">
            {title}
          </div>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="text-white" size={16} />
            ) : (
              <Sun className="text-white" size={16} />
            )}
          </button>
        </div>
        
        {/* Terminal Content */}
        <div className="bg-purple-50 dark:bg-slate-900 p-8 min-h-[500px] font-mono text-purple-900 dark:text-purple-200 transition-colors duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}
