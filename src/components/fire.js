import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/fire/fire.mp3';
const IMAGE_SRC = '/assets/fire/fire.jpg';

class FireAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('fire-ambience')) {
  customElements.define('fire-ambience', FireAmbience);
}
