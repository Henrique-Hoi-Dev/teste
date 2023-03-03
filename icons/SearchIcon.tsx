export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  const stroke = props.stroke || "#222222";

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M31 31L38 38"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 22C10 28.6274 15.3726 34 22 34C25.3194 34 28.3241 32.6522 30.4966 30.474C32.6615 28.3033 34 25.308 34 22C34 15.3726 28.6274 10 22 10C15.3726 10 10 15.3726 10 22Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
