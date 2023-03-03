/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "@/components/Common/Link";
import React, { useEffect, useRef, useState } from "react";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { StrapiImage as StrapiImageType } from "@/interfaces/StrapiImage";
import { StrapiLink } from "@/interfaces/StrapiLink";
import ReactMarkdown from "react-markdown";

import styles from "./styles.module.scss";

export interface CardProps {
  title: string;
  subTitle?: string;
  description: string;
  link?: StrapiLink;
  index: number;
  length: number;
  image: StrapiImageType;
}

export function Card({
  title,
  description,
  link,
  index,
  image,
  subTitle
}: CardProps) {
  
  const ref = useRef<HTMLLIElement>(null);
  const [isVisible, setVisible] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      setTimeout(() => {
        observerRef.current?.disconnect();
      }, 2000);
    });
  }, []);

  useEffect(() => {
    if (observerRef?.current && ref?.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef?.current && ref?.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref]);

  return (
    <li
      ref={ref}
      key={title}
      id={`investment-${index}`}
      className={isVisible ? styles["card__animated"] : ""}
    >
      <div className={styles["column"]}>
        <h2>{title}</h2>
        {subTitle && <h4>{subTitle}</h4>}

        <ReactMarkdown>{description}</ReactMarkdown>
        {link && (
          <Link
            href={link.Url}
            className={styles["link-button"]}
            variant="contained"
          >
            {link.Label}
          </Link>
        )}
      </div>
      <StrapiImage src={image.data.attributes.url} alt={title} loading="lazy" />
    </li>
  );
}
