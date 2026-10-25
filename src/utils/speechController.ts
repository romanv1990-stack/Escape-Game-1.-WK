export interface SpeechCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
  onBoundary?: (charIndex: number) => void;
}

export interface CharacterVoiceProfile {
  characterId: number; // 1 to 5
  name: string;
  rate: number;
  pitch: number;
  voicePreferenceKeywords: string[];
}

// 5 distinct male vocal profiles tailored to the monarch/statesman
export const MALE_VOICE_PROFILES: Record<number, CharacterVoiceProfile> = {
  1: {
    characterId: 1,
    name: 'Franz Joseph I. (Österreich-Ungarn)',
    rate: 0.85, // Slower, aged Habsburg emperor
    pitch: 0.72, // Very deep, gravelly baritone
    voicePreferenceKeywords: ['stefan', 'markus', 'male', 'mann', 'de-de'],
  },
  2: {
    characterId: 2,
    name: 'Wilhelm II. (Deutsches Reich)',
    rate: 1.10, // Staccato, aggressive imperial tempo
    pitch: 1.05, // Higher, sharp military voice
    voicePreferenceKeywords: ['florian', 'martin', 'male', 'deutsch', 'de'],
  },
  3: {
    characterId: 3,
    name: 'Nikolaus II. (Russisches Kaiserreich)',
    rate: 0.88, // Hesitant, solemn, tragic
    pitch: 0.82, // Somber, resonant chest voice
    voicePreferenceKeywords: ['hans', 'klaus', 'stefan', 'male', 'de'],
  },
  4: {
    characterId: 4,
    name: 'Raymond Poincaré (Frankreich)',
    rate: 1.02, // Clear, proud republican cadence
    pitch: 0.94, // Solid mid-baritone
    voicePreferenceKeywords: ['markus', 'florian', 'male', 'de-de', 'de'],
  },
  5: {
    characterId: 5,
    name: 'Sir Edward Grey (Großbritannien)',
    rate: 0.86, // Dignified, elegiac British diplomacy
    pitch: 0.78, // Deep, calm, gravitas
    voicePreferenceKeywords: ['stefan', 'martin', 'male', 'de'],
  },
};

class SpeechController {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  public isSupported: boolean = typeof window !== 'undefined' && 'speechSynthesis' in window;
  public isPlaying: boolean = false;

  public speak(
    text: string,
    characterId: number = 1,
    callbacks?: SpeechCallbacks
  ) {
    if (!this.isSupported) {
      callbacks?.onEnd?.();
      return;
    }

    this.stop();

    try {
      const profile = MALE_VOICE_PROFILES[characterId] || MALE_VOICE_PROFILES[1];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = profile.rate;
      utterance.pitch = profile.pitch;

      const voices = window.speechSynthesis.getVoices();
      // Filter for German voices first
      const germanVoices = voices.filter(
        (v) => v.lang.startsWith('de') || v.lang.includes('DE')
      );

      // Attempt to pick a distinct voice for each character based on preference keywords or cycle through available German voices
      let chosenVoice: SpeechSynthesisVoice | undefined;

      if (germanVoices.length > 0) {
        // Try to match keywords in voice name
        for (const kw of profile.voicePreferenceKeywords) {
          chosenVoice = germanVoices.find((v) =>
            v.name.toLowerCase().includes(kw)
          );
          if (chosenVoice) break;
        }

        // If no keyword matched, assign different voice indices to provide variation
        if (!chosenVoice) {
          const voiceIdx = (characterId - 1) % germanVoices.length;
          chosenVoice = germanVoices[voiceIdx];
        }
      } else if (voices.length > 0) {
        // Fallback to any voice with pitch modulation
        chosenVoice = voices[(characterId - 1) % voices.length];
      }

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      utterance.onstart = () => {
        this.isPlaying = true;
        callbacks?.onStart?.();
      };

      utterance.onend = () => {
        this.isPlaying = false;
        this.currentUtterance = null;
        callbacks?.onEnd?.();
      };

      utterance.onerror = () => {
        this.isPlaying = false;
        this.currentUtterance = null;
        callbacks?.onError?.();
      };

      utterance.onboundary = (event) => {
        callbacks?.onBoundary?.(event.charIndex);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.isPlaying = false;
      callbacks?.onError?.();
    }
  }

  public stop() {
    if (!this.isSupported) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignored
    }
    this.isPlaying = false;
    this.currentUtterance = null;
  }
}

export const speechController = new SpeechController();
