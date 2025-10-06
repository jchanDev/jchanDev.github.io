import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from '../components/Terminal';
import { TypingText } from '../components/TypingText';
import { Folder, Sparkles } from 'lucide-react';

export function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showName, setShowName] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  return (
    <Terminal title="~/home">
      <div className="space-y-4">
        {showWelcome && (
          <div className="flex items-center gap-2">
            <span className="text-pink-500">{'>'}</span>
            <TypingText 
              text="Welcome to my digital space! ✨" 
              speed={50}
              onComplete={() => setShowName(true)}
            />
          </div>
        )}
        
        {showName && (
          <div className="flex items-center gap-2">
            <span className="text-pink-500">{'>'}</span>
            <TypingText 
              text="I'm Julia, a creative developer" 
              speed={50}
              delay={300}
              onComplete={() => setShowDescription(true)}
            />
          </div>
        )}
        
        {showDescription && (
          <div className="flex items-center gap-2">
            <span className="text-pink-500">{'>'}</span>
            <TypingText 
              text="I build things that live on the internet 💜" 
              speed={50}
              delay={300}
              onComplete={() => setShowProjects(true)}
            />
          </div>
        )}

        {showProjects && (
          <div className="mt-8 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-pink-500">{'>'}</span>
              <span>Type 'ls' to view my projects:</span>
            </div>
            
            <div className="ml-6 space-y-3">
              <Link 
                to="/project/1"
                className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg hover:bg-purple-200/50 dark:hover:bg-purple-900/50 transition-all border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 group"
              >
                <Folder className="text-purple-500 dark:text-purple-400 group-hover:text-pink-500 transition-colors" size={24} />
                <div>
                  <div className="font-mono">project_one/</div>
                  <div className="text-sm opacity-70">My first amazing project</div>
                </div>
              </Link>

              <Link 
                to="/project/2"
                className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg hover:bg-purple-200/50 dark:hover:bg-purple-900/50 transition-all border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 group"
              >
                <Folder className="text-purple-500 dark:text-purple-400 group-hover:text-pink-500 transition-colors" size={24} />
                <div>
                  <div className="font-mono">project_two/</div>
                  <div className="text-sm opacity-70">Another cool creation</div>
                </div>
              </Link>

              <Link 
                to="/project/3"
                className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg hover:bg-purple-200/50 dark:hover:bg-purple-900/50 transition-all border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 group"
              >
                <Folder className="text-purple-500 dark:text-purple-400 group-hover:text-pink-500 transition-colors" size={24} />
                <div>
                  <div className="font-mono">project_three/</div>
                  <div className="text-sm opacity-70">Something special</div>
                </div>
              </Link>
            </div>

            <div className="mt-8 p-4 bg-purple-200/30 dark:bg-purple-900/30 rounded-lg border-2 border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-pink-500 dark:text-pink-400" size={16} />
                <span className="text-sm">About Me:</span>
              </div>
              <p className="text-sm ml-6">
                I'm passionate about creating beautiful and functional digital experiences. 
                When I'm not coding, you can find me [your hobbies]. 
                Feel free to explore my projects and see what I've been working on!
              </p>
            </div>
          </div>
        )}
      </div>
    </Terminal>
  );
}
