"use client";

import { useEffect } from "react";

export default function WowEffects() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".hp-header");
    const heroParallax = document.querySelector<HTMLElement>(".hp-hero-photo-parallax");

    const onScroll = () => {
      if (header) {
        if (window.scrollY > 40) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      }
      if (heroParallax) {
        const y = Math.min(window.scrollY, 500) * 0.12;
        heroParallax.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealItems.forEach((el) => io?.observe(el));
    } else {
      revealItems.forEach((el) => el.classList.add("is-visible"));
    }

    const starsWrap = document.querySelector(".hp-stars");
    if (starsWrap && starsWrap.childElementCount === 0) {
      for (let i = 0; i < 46; i++) {
        const s = document.createElement("span");
        s.className = "hp-star";
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        s.style.animationDelay = `${Math.random() * 3.6}s`;
        s.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
        starsWrap.appendChild(s);
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return null;
}

