import { useContext } from "react";
import { ContextGlobal } from "../Context/globalContext";

const FormAOI = () => {
  const { state, dispatch } = useContext(ContextGlobal);

  const handleClickAOI = () => {
    dispatch({ type: "STATE_AOI", payload: !state.stateAOI });
  };

  return (
    <>
      <div className="filter_container">
        <p></p>
        <div className="icon_filter">
          <button>
            <img src="/mage-filter.svg" alt="" width={24} />
          </button>
        </div>
      </div>
      <div className="formAOI_container">
        <img src="/search-plus.svg" alt="" width={70} />
        <div className="form_text_container">
          <p className="text_quetion">
            Searching for existing images in this area?
          </p>
          <p className="text_info">
            Define your Area of Interest and browse our archive
          </p>
        </div>
        <button className="btn_createAOI" onClick={handleClickAOI}>
          YOUR AREA OF INTEREST
        </button>
      </div>
    </>
  );
};

export default FormAOI;
