import { useEffect } from "react";
export function useEvent(key, callbackFunc) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) callbackFunc();
      }
      document.addEventListener("keydown", callback);

      return () => document.removeEventListener("keydown", callback);
    },
    [callbackFunc, key]
  );
}
