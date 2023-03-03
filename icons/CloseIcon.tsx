export function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  const stroke = props.stroke || "#222222";
  const size = props.width || 12;
  const strokeWidth = props.strokeWidth || 1.6;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L11 11M1 11L11 1"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
