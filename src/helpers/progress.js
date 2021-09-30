import nprogress from 'nprogress';

let calls = 0;

export function increment() {
  if (++calls === 1) {
    nprogress.start();
  }
}

export function decrement() {
  setTimeout(() => {
    if (--calls === 0) {
      nprogress.done();
    } else {
      nprogress.inc(0.1);
    }
  });
}

window.addEventListener('beforeunload', (evt) => {
  if (calls > 0) {
    // eslint-disable-next-line no-param-reassign
    evt.returnValue = 'Changes you made may not be saved.';
    return evt.returnValue;
  }

  return undefined;
});
