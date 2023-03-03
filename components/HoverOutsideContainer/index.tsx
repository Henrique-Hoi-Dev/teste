import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  onHoverOutside: Function;
}

export function HoverOutsideContainer(props: Props) {
  const { children, onHoverOutside } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHoverOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onHoverOutside();
      }
    };

    document.addEventListener("mousemove", handleHoverOutside, true);

    return () => {
      document.removeEventListener("mousemove", handleHoverOutside, true);
    };
  }, [onHoverOutside]);

  return <div ref={ref}>{children}</div>;
}
