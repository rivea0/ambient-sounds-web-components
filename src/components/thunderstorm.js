import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/thunderstorm/thunderstorm.mp3';
const IMAGE_SRC = '/assets/thunderstorm/thunderstorm.jpg';

class ThunderstormAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('thunderstorm-ambience')) {
  customElements.define('thunderstorm-ambience', ThunderstormAmbience);
}
