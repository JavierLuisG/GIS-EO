import { useContext, useEffect, useState } from "react";
import { routes, routesExplore } from "../Utils/routes";
import { Link } from "react-router-dom";
import { ContextGlobal } from "../Context/globalContext";

/**
 * Componente que muestra los botones de Commercial y Open para navegar entre ellos
 */
const Explore = () => {
  let option = {
    commercial: "var(--bg-navbar-color)",
    open: "var(--borders-principal)",
  };
  const [styleBorder, setStyleBorder] = useState(option);
  const { state } = useContext(ContextGlobal);

  /**
   * Actualiza el estilo de los bordes dependiendo del estado de exploración.
   *
   * @method useEffect - Efecto que se ejecuta cuando el valor de "state.styleExplore" cambia.
   * @method setStyleBorder - Función para establecer el estilo del borde.
   *
   * Paso a paso:
   * 1. Dependiendo el valor de "state.styleExplore", se actualiza el estilo del borde con la opción seleccionada.
   */
  useEffect(() => {
    if (state.styleExplore) {
      setStyleBorder(option);
    } else {
      setStyleBorder({
        open: "var(--bg-navbar-color)",
        commercial: "var(--borders-principal)",
      });
    }
  }, [state.styleExplore]);

  return (
    <>
      <div className="left_container">
        <Link
          to={`${routes.explore}/${routesExplore.commercial}/aoi=${state.aoi}`}
        >
          <button
            style={{ borderBottom: `2px solid ${styleBorder.commercial}` }}
            className={`btn_commercial`}
          >
            Commercial
          </button>
        </Link>
        <Link to={`${routes.explore}/${routesExplore.open}/aoi=${state.aoi}`}>
          <button
            style={{ borderBottom: `2px solid ${styleBorder.open}` }}
            className={`btn_open`}
          >
            Open
          </button>
        </Link>
      </div>
    </>
  );
};

export default Explore;
