import { PlayBox } from '../play-box.js';

const AUDIO_SRC = './src/assets/rain-on-window/rain-on-window.mp3';
const IMAGE_SRC = './src/assets/rain-on-window/rain-on-window.jpg';

class RainOnWindowAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('rain-on-window')) {
  customElements.define('rain-on-window', RainOnWindowAmbience);
}
