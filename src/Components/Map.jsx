import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../Context/globalContext";

const options = {
  fillColor: "white",
  fillOpacity: 0.1,
  strokeColor: "white",
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: true,
  draggable: true,
  editable: true,
  geodesic: true,
  zIndex: 1,
};

const Map = () => {
  const [center, setCenter] = useState({ lat: 30.2672, lng: -97.7431 }); // Ubicación predeterminada
  const [polygonPath, setPolygonPath] = useState([]);
  const [map, setMap] = useState(null);
  const { state, dispatch } = useContext(ContextGlobal);

  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik",
  });

  useEffect(() => {
    // Función para obtener la ubicación del usuario y centrar el mapa
    if (state.stateAOI) {
      // ToDo: en caso de que no active la ubicación hay que poner el AOI en la ubicación predeterminada en else {}
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          setPolygonPath(createAOI(userLocation)); // Muestra AOI (ubicacion del dispositivo)
          if (map) {
            map.panTo(userLocation); // Centra el mapa en la ubicación del usuario
          }
        });
      } else {
        setCenter({ lat: 30.2672, lng: -97.7431 });
        setPolygonPath(createAOI(center));
        if (map) {
          map.panTo(center);
        }
      }
    } else {
      setPolygonPath([]); // Deja de mostrar AOI (ubicacion del dispositivo)
    }
  }, [state.stateAOI, dispatch]);

  // Función para crear un polígono simple alrededor de la ubicación del usuario, y no aparezca solo un punto
  const createAOI = (location) => {
    const offset = 0.023; // Desplazamiento pequeño para crear un área de interés
    return [
      { lat: location.lat + offset, lng: location.lng - offset },
      { lat: location.lat + offset, lng: location.lng + offset },
      { lat: location.lat - offset, lng: location.lng + offset },
      { lat: location.lat - offset, lng: location.lng - offset },
    ];
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        center={center}
        zoom={state.stateAOI ? 13 : 11}
        onLoad={onLoad}
      >
        <Polygon path={polygonPath} options={options} />
      </GoogleMap>
    </>
  );
};

export default Map;
