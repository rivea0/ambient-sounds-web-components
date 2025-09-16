import { BORDER_RADIUS_VALUES, DEFAULTS } from './utils.js';

const templateEl = document.createElement('template');

templateEl.innerHTML = `
<style>
  :host {
    display: block;

    #box-div {
      background-size: cover;
      width: 17rem;
      height: 17rem;
      border: 5px solid #000000;
      border-radius: 50%;
    }

    #btn-div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: inherit;
      height: inherit;
    }

    #play-btn {
      padding: .5rem;
      opacity: 0.8;
      width: 5rem;
      height: 5rem;
      border: 0;
      border-radius: 50%;
      background-color: #000000;
    }

    #play-btn:hover {
      opacity: 1;
      cursor: pointer;
    }

    audio {
      visibility: hidden;
    }

    #pause-svg {
      width: 32px;
      height: 32px;
      stroke: #fff;
    }

    line {
      transform-origin: center;
      animation: pulse .75s infinite ease-in-out;
    }

    line:nth-child(1) { animation-delay: 0s; }
    line:nth-child(2) { animation-delay: 0.2s; }
    line:nth-child(3) { animation-delay: 0.4s; }
    line:nth-child(4) { animation-delay: 0.6s; }
    line:nth-child(5) { animation-delay: 0.8s; }
    line:nth-child(6) { animation-delay: 1s; }
}

@keyframes pulse {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.4);
  }
}

:host([hidden]) {
  display: none;
}
</style>
<div id="box-div">
  <div id="btn-div">
    <button id="play-btn">
      <svg
        id="play-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-play-icon lucide-play"
      >
        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
      </svg>
      <svg id="pause-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="2" x2="2" y1="6" y2="18"/>
        <line x1="6" x2="6" y1="12" y2="18"/>
        <line x1="10" x2="10" y1="6" y2="18"/>
        <line x1="14" x2="14" y1="11" y2="18"/>
        <line x1="18" x2="18" y1="6" y2="18"/>
        <line x1="22" x2="22" y1="12" y2="18"/>
      </svg>
    </button>
  </div>
  <audio
    id="audio-el"
    loop
  ></audio>
</div>
`;

export class PlayBox extends HTMLElement {
  #overlayColor = DEFAULTS.overlayColor;
  #iconColor = DEFAULTS.iconColor;
  #buttonPosition = DEFAULTS.buttonPosition;
  #boxBorderRadius = DEFAULTS.boxBorderRadius;
  #buttonBorderRadius = DEFAULTS.buttonBorderRadius;

  static get observedAttributes() {
    return [
      'imageSrc',
      'audioSrc',
      'overlayColor',
      'iconColor',
      'buttonPosition',
      'boxBorderRadius',
      'buttonBorderRadius',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateEl.content.cloneNode(true));

    // Used for overlayColor, boxBorderRadius and imageSrc
    this._boxDiv = this.shadowRoot.querySelector('#box-div');

    // Used for buttonPosition
    this._btnDiv = this.shadowRoot.querySelector('#btn-div');

    // Used for playing/pausing audio, overlayColor and buttonBorderRadius
    this._playBtn = this.shadowRoot.querySelector('#play-btn');

    // Used for iconColor and the displays for switching between playing/paused states
    this._playSVG = this.shadowRoot.querySelector('#play-svg');
    this._pauseSVG = this.shadowRoot.querySelector('#pause-svg');

    // Used for audioSrc and checking for the playing/paused state
    this._audioEl = this.shadowRoot.querySelector('#audio-el');
  }

  connectedCallback() {
    if (!this._playBtn || !this._audioEl) {
      return;
    }

    this._updateAttributes();

    this._playBtn.addEventListener('click', this._togglePlay);
  }

  disconnectedCallback() {
    this._playBtn.removeEventListener('click', this._togglePlay);
  }

  set overlayColor(value) {
    const overlayColorValue = Boolean(value);
    if (overlayColorValue) {
      this._boxDiv.style.borderColor = value;
      this._playBtn.style.backgroundColor = value;
      this.#overlayColor = value;
    } else {
      this._boxDiv.style.borderColor = DEFAULTS.overlayColor;
      this._playBtn.style.backgroundColor = DEFAULTS.overlayColor;
      this.#overlayColor = DEFAULTS.overlayColor;
    }
  }

  get overlayColor() {
    return this.#overlayColor;
  }

  set iconColor(value) {
    const iconColorValue = Boolean(value);
    if (iconColorValue) {
      this._playSVG.style.stroke = value;
      this._pauseSVG.style.stroke = value;
      this.#iconColor = value;
    } else {
      this._playSVG.style.stroke = DEFAULTS.iconColor;
      this._pauseSVG.style.stroke = DEFAULTS.iconColor;
      this.#iconColor = DEFAULTS.iconColor;
    }
  }

  get iconColor() {
    return this.#iconColor;
  }

  set buttonPosition(value) {
    this._setButtonPosition(value);
  }

  get buttonPosition() {
    return this.#buttonPosition;
  }

  set boxBorderRadius(value) {
    const allowedValues = Object.keys(BORDER_RADIUS_VALUES);

    if (!allowedValues.includes(value)) {
      throw new Error(`Allowed values are: ${allowedValues.join(', ')}.`);
    }

    this._boxDiv.style.borderRadius = BORDER_RADIUS_VALUES[value];
    this.#boxBorderRadius = value;
  }

  get boxBorderRadius() {
    return this.#boxBorderRadius;
  }

  set buttonBorderRadius(value) {
    const allowedValues = Object.keys(BORDER_RADIUS_VALUES);

    if (!allowedValues.includes(value)) {
      throw new Error(`Allowed values are: ${allowedValues.join(', ')}.`);
    }

    this._playBtn.style.borderRadius = BORDER_RADIUS_VALUES[value];
    this.#buttonBorderRadius = value;
  }

  get buttonBorderRadius() {
    return this.#buttonBorderRadius;
  }

  _updateAttributes() {
    if (this._audioEl) {
      // TODO: Valid src checks
      this._audioEl.src = this.getAttribute('audioSrc');
    }

    if (this._boxDiv && this._playBtn) {
      this.overlayColor = this.getAttribute('overlayColor');
    }

    if (this._boxDiv) {
      this.boxBorderRadius = this.getAttribute('boxBorderRadius') || 'full';
      const bgImageSrc = this.getAttribute('imageSrc');
      // TODO: Valid src checks
      this._boxDiv.style.backgroundImage = `url("${bgImageSrc}")`;
    }

    if (this._playBtn) {
      this.buttonBorderRadius =
        this.getAttribute('buttonBorderRadius') || 'full';

      if (this._audioEl) {
        if (this._audioEl.paused) {
          this._playSVG.style.display = 'inline';
          this._pauseSVG.style.display = 'none';
        } else {
          this._pauseSVG.style.display = 'inline';
          this._playSVG.style.display = 'none';
        }
      }
    }

    if (this._btnDiv) {
      this.buttonPosition = this.getAttribute('buttonPosition') || 'center';
    }

    if (this._playSVG && this._pauseSVG) {
      this.iconColor = this.getAttribute('iconColor');
    }
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'audioSrc':
        // TODO: Valid src checks
        this._audioEl.src = newValue;
        break;
      case 'imageSrc':
        // TODO: Valid src checks
        this._boxDiv.style.backgroundImage = `url("${newValue}")`;
        break;
      case 'overlayColor':
        this.overlayColor = newValue;
        break;
      case 'iconColor':
        this.iconColor = newValue;
        break;
      case 'buttonPosition':
        this.buttonPosition = newValue;
        break;
      case 'boxBorderRadius':
        this.boxBorderRadius = newValue;
        break;
      case 'buttonBorderRadius':
        this.buttonBorderRadius = newValue;
        break;
      default:
        break;
    }
  }

  _togglePlay = () => {
    if (!this._audioEl.paused) {
      this._audioEl.pause();
      this._playSVG.style.display = 'inline';
      this._pauseSVG.style.display = 'none';
    } else {
      this._audioEl.play();
      this._pauseSVG.style.display = 'inline';
      this._playSVG.style.display = 'none';
    }
  };

  _setButtonPosition(position) {
    const allowedValues = [
      'top',
      'top-left',
      'top-right',
      'center',
      'bottom',
      'bottom-left',
      'bottom-right',
    ];

    if (!allowedValues.includes(position)) {
      throw new Error(`Allowed values are: ${allowedValues.join(', ')}.`);
    }

    switch (position) {
      case 'top':
        this._btnDiv.style.justifyContent = 'center';
        this._btnDiv.style.alignItems = 'start';
        break;
      case 'top-left':
        this._btnDiv.style.justifyContent = 'start';
        this._btnDiv.style.alignItems = 'start';
        break;
      case 'top-right':
        this._btnDiv.style.justifyContent = 'end';
        this._btnDiv.style.alignItems = 'start';
        break;
      case 'bottom':
        this._btnDiv.style.justifyContent = 'center';
        this._btnDiv.style.alignItems = 'end';
        break;
      case 'bottom-left':
        this._btnDiv.style.justifyContent = 'start';
        this._btnDiv.style.alignItems = 'end';
        break;
      case 'bottom-right':
        this._btnDiv.style.justifyContent = 'end';
        this._btnDiv.style.alignItems = 'end';
        break;
      case 'center':
        this._btnDiv.style.justifyContent = 'center';
        this._btnDiv.style.alignItems = 'center';
        break;
      default:
        this._btnDiv.style.justifyContent = 'center';
        this._btnDiv.style.alignItems = 'center';
    }

    this.#buttonPosition = position;
  }
}
