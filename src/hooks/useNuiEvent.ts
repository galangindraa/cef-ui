import { MutableRefObject, useEffect, useRef } from "react";
import { noop } from "../utils/misc";

type CefHandlerSignature<T> = (data: T) => void;

/**
 * A hook that registers a CEF event listener via `window.cef.on`.
 * 
 * @param action The event name coming from Pawn/plugin (e.g. "setVisible")
 * @param handler The callback that will handle the data
 *
 * @example
 * useCefEvent<{ visible: boolean }>('setVisible', (data) => {
 *   console.log(data.visible);
 * });
 */
export const useCefEvent = <T = any>(
  action: string,
  handler: CefHandlerSignature<T>
) => {
  const savedHandler: MutableRefObject<CefHandlerSignature<T>> = useRef(noop);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const cef = (window as any)?.cef;

    if (!cef || typeof cef.on !== 'function') {
      console.warn(`[useCefEvent] window.cef or cef.on is not ready for event: ${action}`);
      return;
    }

    const eventListener = (data: T) => {
      savedHandler.current?.(data);
    };

    cef.on(action, eventListener);

    return () => {
      cef.off?.(action, eventListener);
    };
  }, [action]);
};
