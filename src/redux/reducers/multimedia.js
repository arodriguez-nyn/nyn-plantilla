import {
    SET_PAGINA_CONSULTA_MM,
    SET_REGISTRO_ACTUAL_CONSULTA_MM,
    SET_ORDENACION_CONSULTA_MM,
    SET_FILTRO_CONSULTA_MM,
    SET_CAMPOS_FILTRO_CONSULTA_MM,
} from 'redux/types/multimedia'

const initialState = {
    paginaConsultaMM: 1,
    registroActualConsultaMM: null,
    ordenacionConsultaMM: {
        nombre: 'CODENT',
        descripcion: 'Entidad',
    },
    filtroConsultaMM: '',
    camposFiltroConsultaMM: null,
}

export const multimediaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGINA_CONSULTA_MM:
            return {
                ...state,
                paginaConsultaMM: action.payload,
            }
        case SET_REGISTRO_ACTUAL_CONSULTA_MM:
            return {
                ...state,
                registroActualConsultaMM: action.payload,
            }
        case SET_FILTRO_CONSULTA_MM:
            return {
                ...state,
                filtroConsultaMM: action.payload,
            }
        case SET_CAMPOS_FILTRO_CONSULTA_MM:
            return {
                ...state,
                camposFiltroConsultaMM: action.payload,
            }
        case SET_ORDENACION_CONSULTA_MM:
            return {
                ...state,
                ordenacionConsultaMM: action.payload,
            }

        default:
            return state
    }
}
