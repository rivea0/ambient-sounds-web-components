import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/birds/birds.mp3';
const IMAGE_SRC = '/assets/birds/birds.jpg';

class BirdsAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('birds-ambience')) {
  customElements.define('birds-ambience', BirdsAmbience);
}
