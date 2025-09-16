import { debounce, DEFAULTS } from '../src/utils.js';

// Get all the ambience box elements
const items = document.querySelectorAll('.item');
const elements = [...items].map((item) => item.children[1]);

const propValues = {};

// Set default prop values
for (const [key, val] of Object.entries(DEFAULTS)) {
  propValues[key] = val;
}

const handlers = {
  overlayColor: (event) => {
    propValues.overlayColor = event.target.value;
    elements.forEach((el) => {
      el.overlayColor = propValues.overlayColor;
    });
  },
  iconColor: (event) => {
    propValues.iconColor = event.target.value;
    elements.forEach((el) => {
      el.iconColor = propValues.iconColor;
    });
  },
  buttonPosition: (event) => {
    propValues.buttonPosition = event.target.value;
    elements.forEach((el) => {
      el.buttonPosition = propValues.buttonPosition;
    });
  },
  boxBorderRadius: (event) => {
    propValues.boxBorderRadius = event.target.value;
    elements.forEach((el) => {
      el.boxBorderRadius = propValues.boxBorderRadius;
    });
  },
  buttonBorderRadius: (event) => {
    propValues.buttonBorderRadius = event.target.value;
    elements.forEach((el) => {
      el.buttonBorderRadius = propValues.buttonBorderRadius;
    });
  },
};

// data-prop is only defined on form elements
const formElements = document.querySelectorAll('[data-prop]');

formElements.forEach((formEl) => {
  const eventType = formEl.dataset.event; // either `input` or `change`
  const dataProp = formEl.dataset.prop;
  formEl.value = propValues[dataProp];
  const handler = handlers[dataProp];

  if (handler) {
    if (formEl.type === 'text') {
      formEl.addEventListener(eventType, debounce(handler));
    } else {
      formEl.addEventListener(eventType, handler);
    }
  }
});

const resetBtn = document.querySelector('#reset-customization-btn');

resetBtn.addEventListener('click', () => {
  elements.forEach((el) => {
    el.overlayColor = DEFAULTS.overlayColor;
    el.iconColor = DEFAULTS.iconColor;
    el.buttonPosition = DEFAULTS.buttonPosition;
    el.boxBorderRadius = DEFAULTS.boxBorderRadius;
    el.buttonBorderRadius = DEFAULTS.buttonBorderRadius;
  });
  formElements.forEach((formEl) => {
    const dataProp = formEl.dataset.prop;
    formEl.value = DEFAULTS[dataProp];
  });
});
