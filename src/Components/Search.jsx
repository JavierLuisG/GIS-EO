import { useContext } from "react";
import { ContextGlobal } from "../Context/globalContext";
import { useNavigate } from "react-router-dom";
import { routes, routesExplore } from "../Utils/routes";

const Search = () => {
  const { dispatch } = useContext(ContextGlobal);
  const navigate = useNavigate();

  /**
   * Maneja el evento de clic para obtener y procesar el valor del AOI (Área de Interés).
   *
   * @method prompt - Solicita al usuario ingresar manualmente el valor del AOI.
   * @method dispatch - Despacha una acción para actualizar el estado global con el AOI ingresado.
   * @method navigate - Navega a la ruta de exploración con el AOI agregado como parámetro en la URL.
   *
   * Paso a paso:
   * 1. Se solicita al usuario que ingrese manualmente el valor del AOI mediante "prompt".
   * 2. Si el usuario introduce un valor, se despacha la acción "GET_AOI" con el AOI como payload.
   * 3. Se redirige a la ruta de exploración correspondiente, incluyendo el AOI en la URL como parámetro.
   */
  const handleClickForm = () => {
    let aoi = prompt("Indica el AOI:"); // ToDo: el usuario debe ingresar el AOI en mapa
    if (aoi) {
      dispatch({ type: "GET_AOI", payload: aoi });
      navigate(`${routes.explore}/${routesExplore.commercial}/aoi=${aoi}`);
    }
  };

  return (
    <div className="search_container">
      <label className="label_search" htmlFor="search">
        <img src="/search.svg" alt="" width={24} />
      </label>
      <input
        className="input_search"
        type="text"
        id="search"
        placeholder="Search for place or coordinates"
      />
      <div className="btn_search_container">
        <button className="btn_search" onClick={handleClickForm}>
          <img src="/square.svg" alt="" width={24} />
        </button>
      </div>
    </div>
  );
};

export default Search;
