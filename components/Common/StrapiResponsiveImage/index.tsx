import React, { ImgHTMLAttributes } from "react";
import { StrapiImage } from "@/interfaces/StrapiImage";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  img: StrapiImage;
  size?: "large" | "medium" | "small";
}

export function StrapiResponsiveImage(props: Props) {
  const baseUrl = "";

  const { img, size = "large", loading, ...rest } = props;

  const imageSrcBySize = {
    large: img?.data?.attributes.url,
    medium: img?.data?.attributes?.formats?.medium?.url,
    small: img?.data?.attributes?.formats?.small?.url,
  };

  const getImgSrc = () => {
    if (img?.data?.attributes?.formats)
      return `${baseUrl}${imageSrcBySize[size]}`;

    return `${baseUrl}${imageSrcBySize["large"]}`;
  };

  return (
    <picture>
      <img
        src={getImgSrc()}
        loading={loading || "lazy"}
        alt={rest.alt}
        {...rest}
      />
    </picture>
  );
}
