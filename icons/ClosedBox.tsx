export function ClosedBox(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
        stroke="#717171"
        strokeWidth="1.5"
      />
      <path
        d="M10 14.2426L12.1213 12.1213M12.1213 12.1213L14.2426 10M12.1213 12.1213L10 10M12.1213 12.1213L14.2426 14.2426"
        stroke="#F08202"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}