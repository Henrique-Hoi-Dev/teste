import React from "react";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import styles from "./styles.module.scss";

interface Props {
  currentRouteTitle: string;
  previousRoute: {
    label: string;
    href: string;
  };
  className?: string;
}

export function BreadCrumb({
  currentRouteTitle,
  previousRoute,
  className = "",
}: Props) {
  return (
    <header className={`${styles.breadcrumb}  ${className}`}>
      <div className="container">
        <Link href={previousRoute.href}>
          <a>
            <BsChevronLeft /> {previousRoute.label}{" "}
          </a>
        </Link>
        <span> | </span>
        <strong> {currentRouteTitle} </strong>
      </div>
    </header>
  );
}
