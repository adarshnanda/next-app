"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./NavLinks.scss";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="nav-links flex gap-6 flex-wrap items-center justify-center">
      <Link className={`link ${pathname === "/" ? "active" : ""}`} href="/">
        Home
      </Link>

      <Link
        className={`link ${pathname === "/contact" ? "active" : ""}`}
        href="/contact"
      >
        Contact us
      </Link>
      <Link
        className={`link ${pathname === "/about" ? "active" : ""}`}
        href="/about"
      >
        About
      </Link>
      <Link
        className={`link ${pathname === "/date-form" ? "active" : ""}`}
        href="/date-form"
      >
        Date Form
      </Link>
    </nav>
  );
}
