import {
    SET_PAGINA_OBRAS,
    SET_REGISTRO_ACTUAL_OBRAS,
    SET_ORDENACION_OBRAS,
    SET_FILTRO_OBRAS,
    SET_CAMPOS_FILTRO_OBRAS,
} from 'redux/types/administracion-comercial'

/* TABLA EXPEJU */
export const setPaginaObras = pagina => {
    return {
        type: SET_PAGINA_OBRAS,
        payload: pagina,
    }
}

export const setRegistroActualObras = registro => {
    return {
        type: SET_REGISTRO_ACTUAL_OBRAS,
        payload: registro,
    }
}

export const setFiltroObras = filtro => {
    return {
        type: SET_FILTRO_OBRAS,
        payload: filtro,
    }
}

export const setCamposFiltroObras = campos => {
    return {
        type: SET_CAMPOS_FILTRO_OBRAS,
        payload: campos,
    }
}

export const setOrdenacionObras = camposOrdenacion => {
    return {
        type: SET_ORDENACION_OBRAS,
        payload: camposOrdenacion,
    }
}
