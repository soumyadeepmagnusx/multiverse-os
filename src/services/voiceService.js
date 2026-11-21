/**
 * MultiverseOS Multi-Voice Audio Synthesis Engine
 * Uses the Web Speech API with tailored character voice profiles, pitch, and cadence.
 */

// Character voice profile configurations
export const CHARACTER_VOICE_PROFILES = {
  narrator: {
    name: 'Omniscient Narrator',
    pitch: 0.9,
    rate: 0.95,
    gender: 'neutral',
    lang: 'en-US'
  },
  'Kaelen Vex': {
    name: 'Kaelen Vex',
    pitch: 0.8,
    rate: 1.05,
    gender: 'male',
    lang: 'en-US'
  },
  'Lady Morgana Kane': {
    name: 'Lady Morgana Kane',
    pitch: 1.15,
    rate: 0.9,
    gender: 'female',
    lang: 'en-GB'
  },
  'C1-PH3R': {
    name: 'C1-PH3R (Cypher)',
    pitch: 0.65,
    rate: 1.1,
    gender: 'neutral',
    lang: 'en-US'
  }
};

class VoiceEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.currentUtterance = null;
    this.isPlaying = false;
    this.onStateChangeCallback = null;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  getBestVoice(characterName) {
    const profile = CHARACTER_VOICE_PROFILES[characterName] || CHARACTER_VOICE_PROFILES.narrator;
    if (!this.voices.length) this.loadVoices();

    // Prefer high quality English voices
    let selected = this.voices.find(v => v.lang.startsWith('en') && (
      profile.gender === 'female' ? (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha')) :
      profile.gender === 'male' ? (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Alex')) :
      v.name.includes('Google') || v.name.includes('Natural')
    ));

    return selected || this.voices[0] || null;
  }

  speakText(text, characterName = 'narrator', onBoundary, onEnd) {
    if (!this.synth) {
      console.warn("Speech synthesis not supported in this environment");
      return;
    }

    this.stop();

    const profile = CHARACTER_VOICE_PROFILES[characterName] || CHARACTER_VOICE_PROFILES.narrator;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getBestVoice(characterName);

    if (voice) utterance.voice = voice;
    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;

    utterance.onboundary = (event) => {
      if (onBoundary) onBoundary(event);
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", e);
      this.isPlaying = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    this.currentUtterance = utterance;
    this.isPlaying = true;
    if (this.onStateChangeCallback) this.onStateChangeCallback(true);

    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth) {
      this.synth.resume();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }
  }

  subscribeState(callback) {
    this.onStateChangeCallback = callback;
  }
}

export const voiceEngine = new VoiceEngine();
