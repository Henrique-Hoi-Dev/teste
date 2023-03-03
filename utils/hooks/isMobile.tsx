import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 428;

export const isMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onResize = () => {
        setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
      };

      onResize();

      window.addEventListener("resize", onResize);

      return () => window.removeEventListener("resize", onResize);
    }
  }, []);

  return isMobile;
};
