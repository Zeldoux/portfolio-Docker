// src/components/TypingEffect.jsx

import React, { useEffect, useState } from 'react';

/**
 * Component: TypingEffect
 * Creates a typing animation effect for an array of phrases.
 *
 * Props:
 * - `phrases` (array): List of phrases to be typed in sequence.
 * - `typingSpeed` (number): Speed in milliseconds for typing each letter (default: 100ms).
 * - `deleteSpeed` (number): Speed in milliseconds for deleting each letter (default: 50ms).
 * - `pause` (number): Pause in milliseconds after completing a phrase before deletion starts (default: 1000ms).
 */
function TypingEffect({ phrases, typingSpeed = 100, deleteSpeed = 50, pause = 2000 }) {
  // State for the displayed text
  const [displayedText, setDisplayedText] = useState('');

  // Index of the currently displayed phrase
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Index of the current letter being typed or deleted
  const [letterIndex, setLetterIndex] = useState(0);

  // State to track whether the text is being typed or deleted
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]; // Current phrase being animated

    // Function to handle typing or deleting letters
    const type = () => {
      if (isDeleting) {
        // Deleting letters
        if (letterIndex > 0) {
          // Remove one letter at a time
          setDisplayedText(currentPhrase.substring(0, letterIndex - 1));
          setLetterIndex(letterIndex - 1);
        } else {
          // When the phrase is fully deleted, switch to the next phrase
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length); // Loop back to the first phrase after the last one
        }
      } else {
        // Adding letters
        if (letterIndex < currentPhrase.length) {
          // Add one letter at a time
          setDisplayedText(currentPhrase.substring(0, letterIndex + 1));
          setLetterIndex(letterIndex + 1);
        } else {
          // Pause after the full phrase is typed before starting deletion
          setTimeout(() => setIsDeleting(true), pause);
        }
      }
    };

    // Determine typing speed based on the current state (typing or deleting)
    const speed = isDeleting ? deleteSpeed : typingSpeed;
    const timer = setTimeout(type, speed); // Schedule the next typing/deleting action

    return () => clearTimeout(timer); // Cleanup the timeout to prevent memory leaks
  }, [displayedText, letterIndex, isDeleting, phraseIndex, phrases, typingSpeed, deleteSpeed, pause]);

  return (
    // Render the typing effect as a span element
    <span className="typing-text">{displayedText}</span>
  );
}

export default TypingEffect;
