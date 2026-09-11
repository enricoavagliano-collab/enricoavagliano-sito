"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon, FacebookIcon, XIcon, MailIcon } from "./Icons";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "WhatsApp", icon: <WhatsAppIcon />, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: "Facebook", icon: <FacebookIcon />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "X", icon: <XIcon />, href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: "Email", icon: <MailIcon />, href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];

  return (
    <div className="share-buttons">
      <span className="share-label">Condividi:</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          aria-label={l.label}
          title={l.label}
        >
          {l.icon}
        </a>
      ))}
    </div>
  );
}

