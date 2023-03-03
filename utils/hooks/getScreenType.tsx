import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "@/utils/breakpoints";

type screens = "mobile" | "tablet" | "desktop";
interface ICustomBreakpoints {
  tablet: number;
  mobile: number;
}

export const GetScreenType = (
  customParameters?: ICustomBreakpoints
): screens => {
  const [screenType, setScreenType] = useState<screens>("desktop");

  const mobileBreakpoint = customParameters?.mobile || MOBILE_BREAKPOINT;
  const tabletBreakpoint = customParameters?.tablet || TABLET_BREAKPOINT;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onResize = () => {
        let screenType: screens = "desktop";

        if (window.innerWidth <= mobileBreakpoint) screenType = "mobile";
        else if (
          window.innerWidth > mobileBreakpoint &&
          window.innerWidth <= tabletBreakpoint
        )
          screenType = "tablet";

        setScreenType(screenType);
      };

      onResize();

      window.addEventListener("resize", onResize);

      return () => window.removeEventListener("resize", onResize);
    }
  }, [mobileBreakpoint, tabletBreakpoint]);

  return screenType;
};
