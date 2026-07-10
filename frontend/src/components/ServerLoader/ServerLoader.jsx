// ServerLoader.jsx
// Loader reutilizable para las páginas que consumen datos del backend.

import { useEffect, useState } from "react";

import {
  FaRedoAlt,
  FaServer,
  FaSpinner,
} from "react-icons/fa";

import "./ServerLoader.css";

export function ServerLoader({
  resource = "contenido",
}) {
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

  return (
    <div className="serverLoader">
      <FaSpinner className="serverLoader__spinner" />

      <h3 className="serverLoader__title">
        Cargando {resource}...
      </h3>

      {!showServerMessage && (
        <p className="serverLoader__text">
          Estamos preparando la información.
        </p>
      )}

      {showServerMessage && (
        <div className="serverLoader__notice">
          <FaServer className="serverLoader__icon" />

          <p className="serverLoader__text">
            El servidor puede tardar entre{" "}
            <strong>1 y 2 minutos</strong> en
            activarse porque utiliza un alojamiento
            gratuito.
          </p>

          <p className="serverLoader__text">
            Por favor, esperá unos instantes. Si la
            carga no continúa, podés recargar la
            página.
          </p>

          <button
            type="button"
            className="serverLoader__button"
            onClick={handleReload}
          >
            <FaRedoAlt />
            Recargar página
          </button>
        </div>
      )}
    </div>
  );
}