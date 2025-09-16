import { PlayBox } from '../play-box.js';

const AUDIO_SRC = './src/assets/books/books.mp3';
const IMAGE_SRC = './src/assets/books/books.jpg';

class BooksAmbience extends PlayBox {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this._audioEl.src = AUDIO_SRC;
    this._boxDiv.style.backgroundImage = `url("${IMAGE_SRC}")`;
  }
}

if (!customElements.get('books-ambience')) {
  customElements.define('books-ambience', BooksAmbience);
}
