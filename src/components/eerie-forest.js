import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/eerie-forest/eerie-forest.mp3';
const IMAGE_SRC = '/assets/eerie-forest/eerie-forest.jpg';

class EerieForestAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('eerie-forest-ambience')) {
  customElements.define('eerie-forest-ambience', EerieForestAmbience);
}
