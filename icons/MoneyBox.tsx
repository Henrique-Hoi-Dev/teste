export function MoneyBox(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 13V3C1 1.89543 1.89543 1 3 1H17C18.1046 1 19 1.89543 19 3V13C19 14.1046 18.1046 15 17 15H3C1.89543 15 1 14.1046 1 13Z"
        stroke="#717171"
        strokeWidth="1.5"
      />
    </svg>
  );
}
