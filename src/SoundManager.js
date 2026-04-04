// src/SoundManager.js
// Audio playback (SYSTEM layer).
//
// Responsibilities:
// - Load sound assets during preload() (via loadSound)
// - Play sounds by key (SFX/music)
// - Provide a simple abstraction so gameplay code never touches audio directly
//
// Non-goals:
// - Does NOT subscribe to EventBus directly (Game wires events → play())
// - Does NOT decide when events happen (WORLD logic emits events)
// - Does NOT manage UI
//
// Architectural notes:
// - Game connects EventBus events (leaf:collected, player:damaged, etc.) to SoundManager.play().
// - This keeps audio concerns isolated from gameplay and supports easy swapping/muting.

export class SoundManager {
  constructor() {
    this.sfx = {};
  }

  // load(name, path) {
  //   this.sfx["hitEnemy"] = loadSound("assets/sfx/hitEnemy.wav");
  //   this.sfx["jump"] = loadSound("assets/sfx/jump.wav");
  //   this.sfx["leafCollect"] = loadSound("assets/sfx/leafCollect.wav");
  //   this.sfx["music"] = loadSound("assets/sfx/music.wav");
  //   this.sfx["receiveDamage"] = loadSound("assets/sfx/receiveDamage.wav");
  // }

  // play(name) {
  //   this.sfx["hitEnemy"]?.play();
  //   this.sfx["jump"]?.play();
  //   this.sfx["leafCollect"]?.play();
  //   this.sfx["music"]?.play();
  //   this.sfx["receiveDamage"]?.play();
  // }

  load(name, path) {
    this.sfx[name] = loadSound(path);
  }

  play(name) {
    const sound = this.sfx[name];
    if (!sound) return;
    // Don't restart if already playing (prevents overlap on rapid triggers)
    if (!sound.isPlaying()) sound.play();
  }

  playLoop(name) {
    const sound = this.sfx[name];
    if (!sound) return;
    if (!sound.isPlaying()) sound.loop();
  }

  stop(name) {
    this.sfx[name]?.stop();
  }
}
