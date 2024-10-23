import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { skyfiPlatformApiGetArchive } from "../Services/archive";
import DetailExistingImage from "../Components/DetailExistingImage";
import { ContextGlobal } from "../Context/globalContext";

const Detail = () => {
  const params = useParams();
  const { state, dispatch } = useContext(ContextGlobal);

  useEffect(() => {
    dispatch({ type: "TURN_STATE_DETAIL", payload: true }); // Estado de detail a true
    skyfiPlatformApiGetArchive(params.id, dispatch);
  }, []);

  /**
   * Maneja la acción de modificar el estado de Detail a false
   */
  const handleReturn = () => {
    dispatch({ type: "TURN_STATE_DETAIL", payload: false });
  };

  return (
    <>
      <div className="left_container detail_container">
        <div className="header_detail">
          <div className="icon_preview">
            <Link to={-1} onClick={handleReturn}>
              <img src="/arrow-left-line.svg" alt="" width={24} />
            </Link>
          </div>
          <h3 className="msg_preview">Low Resolution Preview</h3>
        </div>
        <DetailExistingImage image={state.detailImage} />
        <div className="footer_detail">
          <div className="price_footer_detail">
            <p className="text_sizemini">0 km2 price:</p>
            <div className="price_text">
              <span className="price">$0.00</span>
              <span className="text_sizemini">pre-tax</span>
            </div>
          </div>
          <button className="btn_footer_detail">
            {/* Se ingresa directamente el svg para modificar su color */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
            >
              <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.94-2H1v2h2l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2zM6.16 6h12.15l-2.76 5H8.53zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2" />
            </svg>
            <p>ADD TO CART</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
