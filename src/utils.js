export const DEFAULTS = {
  overlayColor: '#000000',
  iconColor: '#ffffff',
  buttonPosition: 'center',
  boxBorderRadius: 'full',
  buttonBorderRadius: 'full'
};

export const BORDER_RADIUS_VALUES = {
  'none': '0px',
  'full': '50%',
  'x-small': '0.25rem',
  'small': '0.5rem',
  'medium': '0.75rem',
  'large': '1rem',
  'x-large': '2rem'
};

export function debounce(cb, ms) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      cb.apply(null, args);
    }, ms);
  };
}
