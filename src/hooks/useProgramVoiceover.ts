import { useState, useCallback, useRef } from "react";
import { programVoiceovers, ProgramId } from "@/config/programVoiceovers";

export function useProgramVoiceover() {
  const [isPlaying, setIsPlaying] = useState<ProgramId | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const playVoiceover = useCallback((programId: ProgramId) => {
    // Stop any current playback
    if (isPlaying) {
      window.speechSynthesis.cancel();
    }

    const voiceoverData = programVoiceovers[programId];
    if (!voiceoverData) return;

    setIsLoading(true);

    // Use Web Speech API as fallback for now
    const utterance = new SpeechSynthesisUtterance(voiceoverData.script);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("google")
    ) || voices.find((v) => v.lang.startsWith("en"));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsLoading(false);
      setIsPlaying(programId);
    };

    utterance.onend = () => {
      setIsPlaying(null);
    };

    utterance.onerror = () => {
      setIsLoading(false);
      setIsPlaying(null);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isPlaying]);

  const stopVoiceover = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(null);
  }, []);

  const toggleVoiceover = useCallback((programId: ProgramId) => {
    if (isPlaying === programId) {
      stopVoiceover();
    } else {
      playVoiceover(programId);
    }
  }, [isPlaying, playVoiceover, stopVoiceover]);

  return {
    isPlaying,
    isLoading,
    playVoiceover,
    stopVoiceover,
    toggleVoiceover,
  };
}
