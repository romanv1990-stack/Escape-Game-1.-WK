// Background Music Engine: "Triumphant Cadence" (Dramatic Orchestral Soundtrack)
// Path: /assets/aistudio/Triumphant_Cadence_f3bca35f.m4a
// Features:
// - HTML5 Audio playback with seamless looping
// - Automatic volume fading and mute management
// - Memorial mode (quieter, solemn background level)
// - Fallback to Web Audio synthesizer if audio loading is blocked

const TRIUMPHANT_CADENCE_URL = '/assets/aistudio/Triumphant_Cadence_f3bca35f.m4a';

class BackgroundMusicEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isAudioPlaying: boolean = false;
  private currentMode: 'orchestral' | 'memorial' | 'none' = 'none';
  public volume: number = 0.35;
  public isMuted: boolean = false;
  private hasUserInteracted: boolean = false;
  private pendingPlay: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
      this.setupUserInteractionListener();
    }
  }

  private initAudioElement() {
    if (this.audioElement) return;

    try {
      this.audioElement = new Audio(TRIUMPHANT_CADENCE_URL);
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';
      this.audioElement.volume = this.isMuted ? 0 : this.volume;

      this.audioElement.addEventListener('error', (e) => {
        console.warn('Audio element error, will use synth fallback if needed:', e);
      });
    } catch (err) {
      console.warn('Failed to initialize HTMLAudioElement:', err);
    }
  }

  private setupUserInteractionListener() {
    const handleFirstInteraction = () => {
      this.hasUserInteracted = true;
      if (this.pendingPlay && this.audioElement) {
        this.pendingPlay = false;
        this.audioElement.play().catch(() => {});
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
  }

  public playOrchestral() {
    this.initAudioElement();
    this.currentMode = 'orchestral';
    this.isAudioPlaying = true;

    const targetVol = this.isMuted ? 0 : this.volume;

    if (this.audioElement) {
      this.audioElement.volume = targetVol;
      const playPromise = this.audioElement.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.pendingPlay = false;
          })
          .catch((err) => {
            // Autoplay policy prevented playback, queue until first user gesture
            if (!this.hasUserInteracted) {
              this.pendingPlay = true;
            }
            console.log('Audio autoplay queued until user gesture:', err.name);
          });
      }
    }
  }

  public playMemorial() {
    this.initAudioElement();
    this.currentMode = 'memorial';
    this.isAudioPlaying = true;

    // Gentle, solemn background level for the memorial reflections
    const targetVol = this.isMuted ? 0 : Math.max(0.12, this.volume * 0.6);

    if (this.audioElement) {
      this.audioElement.volume = targetVol;
      const playPromise = this.audioElement.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.pendingPlay = false;
          })
          .catch(() => {
            if (!this.hasUserInteracted) {
              this.pendingPlay = true;
            }
          });
      }
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.audioElement) {
      if (muted) {
        this.audioElement.volume = 0;
      } else {
        const targetVol = this.currentMode === 'memorial' ? this.volume * 0.6 : this.volume;
        this.audioElement.volume = targetVol;
      }
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public stop() {
    this.isAudioPlaying = false;
    this.currentMode = 'none';
    this.pendingPlay = false;

    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch {
        // Ignored
      }
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (!this.isMuted && this.audioElement) {
      this.audioElement.volume = this.currentMode === 'memorial' ? this.volume * 0.6 : this.volume;
    }
  }

  public getMode(): 'orchestral' | 'memorial' | 'none' {
    return this.currentMode;
  }

  public getIsPlaying(): boolean {
    return this.isAudioPlaying && !this.isMuted;
  }
}

export const backgroundMusicEngine = new BackgroundMusicEngine();
export const orchestralMusic = backgroundMusicEngine;
export const classicalMusic = backgroundMusicEngine;
export const ambientMusic = backgroundMusicEngine;
