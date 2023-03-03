import React, { ImgHTMLAttributes } from "react";

export function StrapiImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, loading, ...rest } = props;

  return (
    <picture>
      <img src={src} loading={loading || "lazy"} alt={rest.alt} {...rest} />
    </picture>
  );
}
