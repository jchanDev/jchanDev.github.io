import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  delay?: number;
}

export function TypingText({ text, speed = 50, onComplete, delay = 0 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete, started]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">▋</span>}
    </span>
  );
}
