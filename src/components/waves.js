import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/waves/waves.mp3';
const IMAGE_SRC = '/assets/waves/waves.jpg';

class WavesAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('waves-ambience')) {
  customElements.define('waves-ambience', WavesAmbience);
}
