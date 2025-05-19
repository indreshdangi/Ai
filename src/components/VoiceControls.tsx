
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface VoiceControlsProps {
  onVoiceInput: (text: string) => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({ onVoiceInput }) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const simulateVoiceRecording = () => {
    setIsRecording(true);
    
    // Simulate a voice recording with a timeout
    setTimeout(() => {
      setIsRecording(false);
      // Simulate a received voice input
      const simulatedTexts = [
        "Arre bhai kaise ho? Mujhe ek simple website banana hai",
        "Marketing strategy batao e-commerce ke liye",
        "Python mein calculator banane ka code do",
        "Indresh ke liye ek motivation quote do"
      ];
      const randomText = simulatedTexts[Math.floor(Math.random() * simulatedTexts.length)];
      onVoiceInput(randomText);
    }, 2000);
  };

  return (
    <Button 
      onClick={simulateVoiceRecording}
      variant="default" 
      size="icon" 
      className={`rounded-full h-12 w-12 ${isRecording ? 'pulse-animation' : ''}`}
      disabled={isRecording}
    >
      {isRecording ? (
        <span className="h-3 w-3 rounded-full bg-destructive"></span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      )}
    </Button>
  );
};

export default VoiceControls;
