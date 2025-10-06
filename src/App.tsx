import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Home } from '@/pages/Home';
import { Project1 } from '@/pages/Project1';
import { Project2 } from '@/pages/Project2';
import { Project3 } from '@/pages/Project3';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 p-8 flex items-center justify-center transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/1" element={<Project1 />} />
            <Route path="/project/2" element={<Project2 />} />
            <Route path="/project/3" element={<Project3 />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
