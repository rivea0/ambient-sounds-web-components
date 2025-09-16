import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/typing/typing.mp3';
const IMAGE_SRC = '/assets/typing/typing.jpg';

class TypingAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('typing-ambience')) {
  customElements.define('typing-ambience', TypingAmbience);
}
