import { useState, useEffect, useRef } from "react";

interface Props {
  onDebounce: (value: string) => Promise<void>;
}

export function UseDebounce(props: Props) {
  const { onDebounce } = props;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      onDebounce(value);
    }, 400);

    return () => clearTimeout(timeoutRef.current as any);
  }, [value, onDebounce]);

  return [value, setValue];
}
