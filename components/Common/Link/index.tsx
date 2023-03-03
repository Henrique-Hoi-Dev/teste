import React, { MouseEvent, useCallback } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import styles from "./styles.module.scss";

interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
  variant?: "outlined" | "contained";
  className?: string;
  target?: "_blank" | "_self";
  href?: string;
}

export function Link({
  children,
  variant,
  className,
  href,
  target,
  ...rest
}: LinkProps) {
  const linkCustomClassNames = {
    contained: "link__contained",
    outlined: "link__outlined"
  };

  let customClassName = variant ? linkCustomClassNames[variant] : "";

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if ((href as string).startsWith("#")) {
        e.preventDefault();
        const destination = document.querySelector(href as string);
        if (destination) {
          destination.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    },
    [href]
  );

  return (
    <NextLink href={href} {...rest}>
      <a
        className={`${styles.link} ${styles[customClassName]} ${className}`}
        target={target || "_self"}
        onClick={handleClick}
      >
        {children}
      </a>
    </NextLink>
  );
}
