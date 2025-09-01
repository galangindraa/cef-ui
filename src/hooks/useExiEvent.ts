import { useEffect, useRef } from 'react';
import { noop } from '../utils/misc';

type FrameVisibleSetter = (bool: boolean) => void;

const LISTENED_KEYS = ['Escape', 'KeyEscape'];

export const useExitListener = (visibleSetter: FrameVisibleSetter) => {
  const setterRef = useRef<FrameVisibleSetter>(noop);

  useEffect(() => {
    setterRef.current = visibleSetter;
  }, [visibleSetter]);

  useEffect(() => {
    const handleExit = () => {
      setterRef.current(false);
      (window as any).cef?.emit("ui:exit");
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (LISTENED_KEYS.includes(e.code) || LISTENED_KEYS.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        handleExit();
      }
    };

    const keyDownHandler = (e: KeyboardEvent) => {
      if (LISTENED_KEYS.includes(e.code) || LISTENED_KEYS.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        handleExit();
      }
    };

    window.addEventListener('keyup', keyHandler, { capture: true });
    window.addEventListener('keydown', keyDownHandler, { capture: true });
    
    document.addEventListener('keyup', keyHandler, { capture: true });
    document.addEventListener('keydown', keyDownHandler, { capture: true });

    return () => {
      window.removeEventListener('keyup', keyHandler, { capture: true });
      window.removeEventListener('keydown', keyDownHandler, { capture: true });
      document.removeEventListener('keyup', keyHandler, { capture: true });
      document.removeEventListener('keydown', keyDownHandler, { capture: true });
    };
  }, []);
};
