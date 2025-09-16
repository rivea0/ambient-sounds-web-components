import { PlayBox } from '../play-box.js';

const AUDIO_SRC = './src/assets/coffee-shop/coffee-shop.mp3';
const IMAGE_SRC = './src/assets/coffee-shop/coffee-shop.jpg';

class CoffeeShopAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('coffee-shop-ambience')) {
  customElements.define('coffee-shop-ambience', CoffeeShopAmbience);
}
