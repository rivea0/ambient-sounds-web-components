import { PlayBox } from '../play-box.js';

const AUDIO_SRC = '/assets/walking-on-forest-road/walking-on-forest-road.mp3';
const IMAGE_SRC = '/assets/walking-on-forest-road/walking-on-forest-road.jpg';

class WalkingOnForestRoadAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('walking-on-forest-road')) {
  customElements.define('walking-on-forest-road', WalkingOnForestRoadAmbience);
}
