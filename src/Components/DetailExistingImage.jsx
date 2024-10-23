import { useRef } from "react";

const DetailExistingImage = ({ image }) => {
  const containerRef = useRef(null); // Referencia al contenedor con scroll
  // Verificación si 'thumbnailUrls' y '300x300' existen antes de acceder
  const thumbnail = image.thumbnailUrls && image.thumbnailUrls["300x300"];

  /**
   * Evitar acceder al promp 'image' cuando aún está vacío
   */ 
  if (Object.keys(image).length === 0) {
    return <p className="scroll_container"></p>;
  }

  /**
   * Capitaliza la primera letra de cada palabra en el texto, excepto cuando es "SAR".
   *
   * @param {string} text - Cadena de texto que será procesada.
   * @method .toLowerCase() - Convierte el texto a minúsculas.
   * @method .split() - Divide el texto en un array de palabras, en este caso usando un espacio como separador.
   * @method .map() - Aplica una función a cada palabra para capitalizar la primera letra.
   * @method .charAt(0).toUpperCase() - Convierte la primera letra de cada palabra en mayúscula.
   * @method .slice(1) - Obtiene el resto de la palabra a partir del segundo carácter.
   * @method .join() - Une las palabras capitalizadas en una cadena de texto separadas por espacios.
   * @returns {string} - El texto con la primera letra de cada palabra capitalizada, a excepción de "SAR".
   * Paso a paso:
   * 1. Si el texto no es "SAR", se convierte todo el texto a minúsculas.
   * 2. Se divide el texto en palabras utilizando .split(" ").
   * 3. Se aplica .map() a cada palabra para capitalizar la primera letra.
   * 4. El resultado se une de nuevo en una cadena utilizando .join(" ").
   * 5. Si el texto es "SAR", simplemente se devuelve sin modificaciones.
   */
  const textCapitalize = (text) => {
    if (text !== "SAR") {
      return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      return text;
    }
  };

  /**
   * Convierte una cadena de fecha ISO en una fecha formateada en el estilo "día mes año"
   *
   * @param {string} isoString - Cadena de fecha que será procesada, "2000-01-01T00:00:00.024000-05:00".
   * @method Date - Convierte la cadena a un objeto Date.
   * @method Intl.DateTimeFormat - Un objeto nativo de JavaScript utilizado para formatear la fecha.
   * @method .format() - Convierte el objeto Date en una cadena formateada de acuerdo con las opciones de localización.
   * @returns {string} - Fecha formateada como, "1 January 2000".
   * Paso a paso:
   * 1. Se convierte "isoString" a un objeto "Date" utilizando "new Date(isoString)".
   * 2. Se define el formato de la fecha deseado utilizando un objeto. Se especifica que se quiere día, mes y año.
   * 3. Se utiliza "Intl.DateTimeFormat" con la localización "en-GB" (formato británico) pone día primero.
   * 4. El método ".format()" es aplicado al objeto "Date" para devolver la fecha como una cadena en el formato "día mes año".
   */
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  /**
   * Convierte una cadena de tiempo en formato ISO a formato de 12 horas con AM/PM.
   *
   * @param {string} isoString - Cadena de tiempo en formato ISO, por ejemplo "2000-01-01T00:00:00.024000-05:00".
   * @method split('T') - Divide la cadena ISO para extraer la parte de la hora.
   * @method split(':') - Divide la hora en horas y minutos.
   * @method parseInt - Convierte la cadena de horas a un número entero.
   *
   * Paso a paso:
   * 1. Se extrae la parte de la hora de la cadena ISO dividiéndola en "T" y luego en ":" para obtener horas y minutos.
   * 2. Se convierte la hora a un número entero utilizando "parseInt" y se ajusta al formato de 12 horas.
   * 3. Se determina si es AM o PM en base a si la hora es mayor o igual a 12.
   * 4. Se devuelve la hora en formato "hh:mm AM/PM", ajustando las horas para el formato de 12 horas.
   */
  function formatTime(isoString) {
    const timePart = isoString.split("T")[1].split(":");
    let hours = parseInt(timePart[0], 10);
    const minutes = timePart[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  /**
   * Formatea el valor de la resolución (gsd) en centímetros o metros dependiendo de su tamaño.
   *
   * @param {number} gsd - Valor de la resolución en centímetros.
   * @method toFixed(0) - Redondea el valor a un número entero sin decimales.
   *
   * Paso a paso:
   * 1. Si el valor de "gsd" es menor a 100, se devuelve el valor redondeado en centímetros, agregando "cm" al final.
   * 2. Si el valor es igual o mayor a 100, se convierte a metros dividiendo por 100 y agregando "m" al final.
   */
  const sizeResolution = (gsd) => {
    if (gsd < 100) {
      return gsd.toFixed(0) + "cm";
    } else {
      return gsd / 100 + "m";
    }
  };

  let infoDetail = [
    { title: "GSD:", value: sizeResolution(image.gsd) },
    { title: "Date:", value: formatDate(image.captureTimestamp) },
    { title: "Local Time:", value: formatTime(image.captureTimestamp) },
    {
      title: "Estimated cloud cover over image:",
      value: `${image.cloudCoveragePercent.toFixed(2)}%`,
    },
    // {title: "Number of Bands:", value: ""}, // ToDo: determinar numero de bandas para todas las imagenes
    {
      title: "File will be delivered in:",
      value: `${image.deliveryTimeHours.toFixed(0)}hrs (approx.)`,
    },
    { title: "Sensor:", value: image.productType },
    { title: "Source (Satellite):", value: textCapitalize(image.provider) },
    { title: "Off-nadir:", value: `${image.offNadirAngle.toFixed(2)}°` },
    { title: "Minimum size order:", value: `${image.minSqKm.toFixed(0)} km2` },
  ];

  return (
    <>
      <div className="scroll_container">
        <div className="title_detail">
          <p>Image Details</p>
          <button className="btn_clarity">
            <img src="/clarity-share-line.svg" alt="" width={20} />
          </button>
        </div>
        <div>
          {thumbnail && (
            <>
              <section className="content_detail">
                <section className="general_info_detail">
                  <img
                    className="img_detail"
                    src={image.thumbnailUrls["300x300"]}
                  />
                  <div className="info_detail">
                    <p>
                      <b>{textCapitalize(image.productType)} Image</b>
                    </p>
                    <p className="info_second">
                      {`${textCapitalize(image.resolution)} Resolution: 
                      ${sizeResolution(image.gsd)} per pixel`}
                    </p>
                    <button className="btn_sample_detail">
                      SEE SAMPLE IMAGES
                    </button>
                  </div>
                </section>
                <section className="specific_info_detail">
                  {infoDetail.map((element, index) => (
                    <div key={index} className="cuadrilla_detail">
                      <p>{element.title}</p>
                      <p style={{ fontWeight: "500" }}>{element.value}</p>
                    </div>
                  ))}
                </section>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailExistingImage;
