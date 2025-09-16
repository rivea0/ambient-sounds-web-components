import { PlayBox } from '../play-box.js';

const AUDIO_SRC = './src/assets/heavy-rain/heavy-rain.mp3';
const IMAGE_SRC = './src/assets/heavy-rain/heavy-rain.jpg';

class HeavyRainAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('heavy-rain-ambience')) {
  customElements.define('heavy-rain-ambience', HeavyRainAmbience);
}
