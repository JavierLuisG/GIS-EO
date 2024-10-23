import { useContext, useEffect, useRef } from "react";
import Card from "./Card";
import { skyfiPlatformApiArchives } from "../Services/archive";
import { ContextGlobal } from "../Context/globalContext";
import { Link, useParams } from "react-router-dom";
import { continueCatalogArchives } from "../Services/archive";
import { filters } from "../Utils/filtersArchiveData";

const OpenData = () => {
  const { state, dispatch } = useContext(ContextGlobal);
  const containerRef = useRef(null); // Referencia al contenedor con scroll
  const params = useParams(); // Obtiene el parámetro de la URL

  /**
   * Actualiza el valor del estado para determinar el color del borde.
   */
  useEffect(() => {
    dispatch({ type: "STYLE_SELECTED_OPTION_EXPLORE", payload: false });
  }, []);

  useEffect(() => {
    const filterOpen = {
      aoi: params.aoi.replace("aoi=", ""), // se remplaza porque fue enviado con un parametro identificador "aoi="
      resolutions: filters.resolutionsOpen,
      productTypes: filters.productTypesOpen,
      providers: filters.providers,
      openData: filters.openData,
    };
    skyfiPlatformApiArchives(dispatch, filterOpen);
  }, []);

  /**
   * Detecta si el scroll ha llegado al final del contenedor.
   *
   * @method containerRef.current - Referencia al contenedor cuyo scroll está siendo monitoreado.
   * @method scrollTop - La cantidad de scroll que se ha hecho desde la parte superior.
   * @method clientHeight - La altura visible del contenedor.
   * @method scrollHeight - La altura total del contenido dentro del contenedor.
   *
   * Paso a paso:
   * 1. Se obtiene la referencia del contenedor usando "containerRef.current".
   * 2. Se verifica si el scroll ha alcanzado el final comparando "scrollTop + clientHeight" con "scrollHeight - 5".
   * 3. Si hay más páginas disponibles (state.nextPage no es null), se llama a "continueCatalogArchives" para cargar la siguiente página.
   */
  const handleScroll = () => {
    const cont = containerRef.current;
    if (cont.scrollTop + cont.clientHeight >= cont.scrollHeight - 5) {
      state.nextPage !== null &&
        continueCatalogArchives(state.nextPage, dispatch);
    }
  };

  return (
    <>
      <div
        className="scroll_container"
        ref={containerRef}
        onScroll={handleScroll} // Detecta el evento de scroll
      >
        <div className="filter_container">
          <p>Images already captured</p>
          <div className="icon_filter">
            <button>
              <img src="/mage-filter.svg" alt="" width={24} />
            </button>
          </div>
        </div>
        <div className="container_cards">
          {state.imageOpen.map((image) => (
            <Card key={image.archiveId} image={image} />
          ))}
          <div className="link_taskingorder">
            <p>Not finding what you're looking for?</p>
            <Link to={"https://google.com"}>ORDER NEW IMAGE</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenData;
