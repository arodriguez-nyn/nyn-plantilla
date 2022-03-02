import {
    SET_PAGINA_CONSULTA_MM,
    SET_REGISTRO_ACTUAL_CONSULTA_MM,
    SET_ORDENACION_CONSULTA_MM,
    SET_FILTRO_CONSULTA_MM,
    SET_CAMPOS_FILTRO_CONSULTA_MM,
} from 'redux/types/multimedia'

export const setPaginaConsultaMM = pagina => {
    return {
        type: SET_PAGINA_CONSULTA_MM,
        payload: pagina,
    }
}

export const setRegistroActualConsultaMM = registro => {
    return {
        type: SET_REGISTRO_ACTUAL_CONSULTA_MM,
        payload: registro,
    }
}

export const setFiltroConsultaMM = filtro => {
    return {
        type: SET_FILTRO_CONSULTA_MM,
        payload: filtro,
    }
}

export const setCamposFiltroConsultaMM = campos => {
    return {
        type: SET_CAMPOS_FILTRO_CONSULTA_MM,
        payload: campos,
    }
}

export const setOrdenacionConsultaMM = camposOrdenacion => {
    return {
        type: SET_ORDENACION_CONSULTA_MM,
        payload: camposOrdenacion,
    }
}
