import { useState, useEffect, useRef } from 'react';

/**
 * useTypewriter — cycles through an array of strings with a typing/erasing animation.
 * @param {string[]} words     — list of strings to cycle through
 * @param {number}  typeSpeed  — ms per character typed (default 80)
 * @param {number}  eraseSpeed — ms per character erased (default 45)
 * @param {number}  holdTime   — ms to hold the completed word (default 1800)
 * @returns {{ text: string, isTyping: boolean }}
 */
export function useTypewriter(words, typeSpeed = 80, eraseSpeed = 45, holdTime = 1800) {
  const [text, setText]       = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const indexRef  = useRef(0);   // which word
  const charRef   = useRef(0);   // char position
  const timerRef  = useRef(null);

  useEffect(() => {
    if (!words?.length) return;

    const tick = () => {
      const word = words[indexRef.current];

      if (isTyping) {
        if (charRef.current < word.length) {
          charRef.current += 1;
          setText(word.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, typeSpeed);
        } else {
          // Finished typing → hold, then erase
          timerRef.current = setTimeout(() => {
            setIsTyping(false);
          }, holdTime);
        }
      } else {
        if (charRef.current > 0) {
          charRef.current -= 1;
          setText(word.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, eraseSpeed);
        } else {
          // Finished erasing → move to next word
          indexRef.current = (indexRef.current + 1) % words.length;
          setIsTyping(true);
          timerRef.current = setTimeout(tick, typeSpeed + 100);
        }
      }
    };

    timerRef.current = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timerRef.current);
  }, [isTyping, words, typeSpeed, eraseSpeed, holdTime]);

  return { text, isTyping };
}
