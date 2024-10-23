export const initialState = {
    imageOpen: [], nextPage: null, stateDetail: false, detailImage: {}, stateAOI: false, aoi: "", styleExplore: true
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "GET_OPENDATA": // contiene las imagenes obtenidas de la API
            return { ...state, imageOpen: action.payload };
        case "NEXT_PAGE_OPENDATA": // contiene el link de paginación
            return { ...state, nextPage: action.payload };
        case "GET_LOADINGMORE_OPENDATA": // agrega las nuevas imagenes obtenidas de nextPage
            // Filtrar las nuevas imágenes que no están ya en state.imageOpen
            const noRepit = action.payload.filter((newImage) =>
                !state.imageOpen.some((existingImage) =>
                    existingImage.archiveId === newImage.archiveId)
            );
            return { ...state, imageOpen: [...state.imageOpen, ...noRepit] };
        case "GET_DETAILIMAGE": // información que se muestra en Detail
            return { ...state, detailImage: action.payload };
        case "STATE_AOI": // estado que confirma si hay o no un AOI en el map
            return { ...state, stateAOI: action.payload };
        case "GET_AOI": // obtener el AOI del botón del Search
            return { ...state, aoi: action.payload };
        case "TURN_STATE_DETAIL": // con el fin de que no aparezca Search y Explore en LayoutExistingImage
            return { ...state, stateDetail: action.payload };
        case "STYLE_SELECTED_OPTION_EXPLORE": // manejar el border-bottom de las opciones Commercial y Open
            return { ...state, styleExplore: action.payload }
        default:
            throw new Error("Error in Reducer");
    }
};