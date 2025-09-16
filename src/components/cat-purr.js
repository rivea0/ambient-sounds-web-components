import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/cat-purr/cat-purr.mp3';
const IMAGE_SRC = '/assets/cat-purr/cat-purr.jpg';

class CatPurr extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('cat-purr')) {
  customElements.define('cat-purr', CatPurr);
}
