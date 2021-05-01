import React, { useEffect } from 'react';

// https://github.com/Pomax/react-onclickoutside/issues/310#issuecomment-503547025
function useOnClickOutside(
  ref: React.MutableRefObject<HTMLDivElement>,
  handler: () => void,
  exempt: [React.MutableRefObject<HTMLElement>],
): any {
  useEffect(
    () => {
      const listener = (event) => {
        let isExempt = false;
        for (let i = 0; i < exempt.length; i++) {
          if (exempt[i].current === event.target) {
            isExempt = true;
          }
        }
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target) || isExempt) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
}

export default useOnClickOutside;
