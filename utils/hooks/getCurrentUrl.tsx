import { useEffect, useState } from "react";

export const GetCurrentUrl = (): string => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return url;
};
