import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/wind/wind.mp3';
const IMAGE_SRC = '/assets/wind/wind.jpg';

class WindAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('wind-ambience')) {
  customElements.define('wind-ambience', WindAmbience);
}
