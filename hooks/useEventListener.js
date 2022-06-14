import { useEffect, useRef } from "react";

const useEventListener = (eventType, callback, element) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const el = element === undefined ? window : element;

    const handler = (e) => callbackRef.current(e);
    el.addEventListener(eventType, handler);

    return () => {
      el.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
};

export default useEventListener;
