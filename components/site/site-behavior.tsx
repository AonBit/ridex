"use client";

import { useEffect } from "react";

export function SiteBehavior() {
  useEffect(() => {
    const overlay = document.querySelector<HTMLElement>("[data-overlay]");
    const navbar = document.querySelector<HTMLElement>("[data-navbar]");
    const navToggleBtn = document.querySelector<HTMLElement>("[data-nav-toggle-btn]");
    const navbarLinks = document.querySelectorAll<HTMLElement>("[data-nav-link]");
    const header = document.querySelector<HTMLElement>("[data-header]");

    const toggle = () => {
      navToggleBtn?.classList.toggle("active");
      navbar?.classList.toggle("active");
      overlay?.classList.toggle("active");
    };

    navToggleBtn?.addEventListener("click", toggle);
    overlay?.addEventListener("click", toggle);
    navbarLinks.forEach((link) => link.addEventListener("click", toggle));

    const onScroll = () => {
      if (!header) return;
      if (window.scrollY >= 10) header.classList.add("active");
      else header.classList.remove("active");
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      navToggleBtn?.removeEventListener("click", toggle);
      overlay?.removeEventListener("click", toggle);
      navbarLinks.forEach((link) => link.removeEventListener("click", toggle));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
