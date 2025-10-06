import { Link } from 'react-router-dom';
import { Terminal } from '../components/Terminal';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

export function Project1() {
  return (
    <Terminal title="~/projects/project_one">
      <div className="space-y-6">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-pink-500 transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          <span>cd ..</span>
        </Link>

        <div>
          <h1 className="text-purple-700 dark:text-purple-300 mb-2">PROJECT_ONE.exe</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500 rounded-full mb-6"></div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-700">
            <div className="text-pink-500 dark:text-pink-400 mb-2">{'>'} Description:</div>
            <p className="ml-4">
              This is a detailed description of your first project. 
              Explain what problem it solves, what technologies you used, 
              and what makes it special. Share your creative process and 
              any challenges you overcame.
            </p>
          </div>

          <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-700">
            <div className="text-pink-500 dark:text-pink-400 mb-2">{'>'} Technologies:</div>
            <div className="ml-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-200 dark:bg-purple-800 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-purple-200 dark:bg-purple-800 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-purple-200 dark:bg-purple-800 rounded-full text-sm">Tailwind</span>
              <span className="px-3 py-1 bg-purple-200 dark:bg-purple-800 rounded-full text-sm">Node.js</span>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-700">
            <div className="text-pink-500 dark:text-pink-400 mb-2">{'>'} Features:</div>
            <ul className="ml-4 space-y-1 list-disc list-inside">
              <li>Feature one - something cool</li>
              <li>Feature two - another awesome thing</li>
              <li>Feature three - what makes it special</li>
              <li>Feature four - why users love it</li>
            </ul>
          </div>

          <div className="flex gap-4 mt-6">
            <a
              href="https://github.com/yourusername/project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 dark:bg-purple-600 text-white rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors"
            >
              <Github size={18} />
              <span>View Code</span>
            </a>
            <a
              href="https://your-project-demo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 dark:bg-pink-600 text-white rounded-lg hover:bg-pink-600 dark:hover:bg-pink-700 transition-colors"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </Terminal>
  );
}
