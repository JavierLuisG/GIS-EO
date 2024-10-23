import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { routes, routesExplore } from "../Utils/routes";
import { ContextGlobal } from "../Context/globalContext";

const Navbar = () => {
  const { state } = useContext(ContextGlobal);

  return (
    <div className="navbar_container">
      <Link to={`${routes.home}`}>
        <button className="btn_navbar">
          <img className="img_navbar principal_icon" src="/principal-navbar.svg" />
        </button>
      </Link>
      <hr aria-orientation="horizontal" className="hr_line"/>
      <Link to={""}>
        <button className="btn_navbar">
          <img className="img_navbar" src="/satellite.svg" />
        </button>
      </Link>
      {state.aoi !== "" ? (
        <Link
          to={`${routes.explore}/${routesExplore.commercial}/aoi=${state.aoi}`}
        >
          <button className="btn_navbar">
            <img className="img_navbar" src="/earth-existing-image.svg" />
          </button>
        </Link>
      ) : (
        <Link to={`${routes.explore}`}>
          <button className="btn_navbar">
            <img className="img_navbar" src="/earth-existing-image.svg" />
          </button>
        </Link>
      )}
      <Link to={""}>
        <button className="btn_navbar">
          <img className="img_navbar" src="/analytics.svg" />
        </button>
      </Link>
      <hr aria-orientation="horizontal" className="hr_line"/>
      <Link to={""}>
        <button className="btn_navbar">
          <img className="img_navbar" src="/orders.svg" />
        </button>
      </Link>
      <Link to={""}>
        <button className="btn_navbar">
          <img className="img_navbar" src="/myAOI.svg" />
        </button>
      </Link>
      <Link to={""}>
        <button className="btn_navbar">
          <img className="img_navbar" src="/shopping-cart.svg" />
        </button>
      </Link>
      <Link to={""}>
        <button className="btn_navbar">
          <img className="img_navbar" src="/profile.svg" />
        </button>
      </Link>
      <hr aria-orientation="horizontal" className="hr_line"/>
    </div>
  );
};

export default Navbar;
