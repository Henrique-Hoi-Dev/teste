import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  onClickOutside: Function;
  className?: string;
}

export function ClickOutsideContainer(props: Props) {
  const { children, onClickOutside, className } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
