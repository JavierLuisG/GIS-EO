import Search from "../Components/Search";
import { Outlet } from "react-router-dom";
import Explore from "../Routes/Explore";
import { useContext } from "react";
import { ContextGlobal } from "../Context/globalContext";

const LayoutExistingImage = () => {
  const { state } = useContext(ContextGlobal);

  return (
    <div className="left_container">
      {state.stateDetail == false ? (
        <>
          <Search />
          <Explore />
        </>
      ) : null}
      <Outlet />
    </div>
  );
};

export default LayoutExistingImage;
