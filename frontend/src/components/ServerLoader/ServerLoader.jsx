// ServerLoader.jsx
// Loader reutilizable para las páginas que consumen datos del backend.

import { useEffect, useState } from "react";
import {
  FaRedoAlt,
  FaServer,
  FaSpinner,
} from "react-icons/fa";

import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n";

import "./ServerLoader.css";

export function ServerLoader({
  resource = "",
}) {
  const { language } = useLanguage();

  const t = translations[language].serverLoader;

  const [showServerMessage, setShowServerMessage] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowServerMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  function handleReload() {
    window.location.reload();
  }

  const loadingTitle = resource
    ? `${t.loading} ${resource}...`
    : `${t.loadingContent}...`;

  return (
    <div
      className="serverLoader"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <FaSpinner
        className="serverLoader__spinner"
        aria-hidden="true"
      />

      <h3 className="serverLoader__title">
        {loadingTitle}
      </h3>

      {!showServerMessage && (
        <p className="serverLoader__text">
          {t.preparing}
        </p>
      )}

      {showServerMessage && (
        <div className="serverLoader__notice">
          <FaServer
            className="serverLoader__icon"
            aria-hidden="true"
          />

          <p className="serverLoader__text">
            {t.serverDelayBefore}{" "}
            <strong>{t.waitTime}</strong>{" "}
            {t.serverDelayAfter}
          </p>

          <p className="serverLoader__text">
            {t.waitMessage}
          </p>

          <button
            type="button"
            className="serverLoader__button"
            onClick={handleReload}
          >
            <FaRedoAlt aria-hidden="true" />

            {t.reload}
          </button>
        </div>
      )}
    </div>
  );
}