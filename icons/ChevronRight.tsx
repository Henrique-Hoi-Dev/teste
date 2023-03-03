import React from "react";

export function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  const stroke = props.stroke || "white";
  const size = props.width || 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 6L15.5 12L9.5 18"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
