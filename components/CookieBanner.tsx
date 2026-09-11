"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    window.localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Questo sito utilizza cookie tecnici necessari al suo corretto
        funzionamento. Continuando la navigazione ne accetti l'utilizzo.{" "}
        <a href="/privacy">Leggi la Privacy Policy</a>.
      </p>
      <button onClick={accept} className="cookie-banner-btn">
        Accetta
      </button>
    </div>
  );
}

