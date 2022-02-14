import {
    SET_PAGINA_EXPEJU,
    SET_REGISTRO_ACTUAL_EXPEJU,
    SET_ORDENACION_EXPEJU,
    SET_FILTRO_EXPEJU,
    SET_CAMPOS_FILTRO_EXPEJU,
    SET_PAGINA_EXJUAB,
    SET_REGISTRO_ACTUAL_EXJUAB,
    SET_ORDENACION_EXJUAB,
    SET_FILTRO_EXJUAB,
    SET_CAMPOS_FILTRO_EXJUAB,
    SET_PAGINA_EXJUTE,
    SET_REGISTRO_ACTUAL_EXJUTE,
    SET_ORDENACION_EXJUTE,
    SET_FILTRO_EXJUTE,
    SET_CAMPOS_FILTRO_EXJUTE,
    SET_PAGINA_EXJURE,
    SET_REGISTRO_ACTUAL_EXJURE,
    SET_ORDENACION_EXJURE,
    SET_FILTRO_EXJURE,
    SET_CAMPOS_FILTRO_EXJURE,
} from 'redux/types/juridica'

const initialState = {
    paginaExpeju: 1,
    registroActualExpeju: null,
    ordenacionExpeju: {
        nombre: 'DESCRIPCION_TEMA',
        descripcion: 'Tema',
    },
    filtroExpeju: '',
    camposFiltroExpeju: null,

    paginaExjute: 1,
    registroActualExjute: null,
    ordenacionExjute: {
        nombre: 'DESCRI',
        descripcion: 'Tema',
    },
    filtroExjute: '',
    camposFiltroExjute: null,

    paginaExjuab: 1,
    registroActualExjuab: null,
    ordenacionExjuab: {
        nombre: 'NOMBRE',
        descripcion: 'Abogado',
    },
    filtroExjuab: '',
    camposFiltroExjuab: null,

    paginaExjur: 1,
    registroActualExjure: null,
    ordenacionExjure: {
        nombre: 'NOMBRE',
        descripcion: 'Responsable',
    },
    filtroExjure: '',
    camposFiltroExjure: null,
}

export const juridicaReducer = (state = initialState, action) => {
    switch (action.type) {
        /* TABLA EXPEJU */
        case SET_PAGINA_EXPEJU:
            return {
                ...state,
                paginaExpeju: action.payload,
            }
        case SET_REGISTRO_ACTUAL_EXPEJU:
            return {
                ...state,
                registroActualExpeju: action.payload,
            }
        case SET_FILTRO_EXPEJU:
            return {
                ...state,
                filtroExpeju: action.payload,
            }
        case SET_CAMPOS_FILTRO_EXPEJU:
            return {
                ...state,
                camposFiltroExpeju: action.payload,
            }
        case SET_ORDENACION_EXPEJU:
            return {
                ...state,
                ordenacionExpeju: action.payload,
            }
        /* TABLA EXJUAB */
        case SET_PAGINA_EXJUAB:
            return {
                ...state,
                paginaExjuab: action.payload,
            }
        case SET_REGISTRO_ACTUAL_EXJUAB:
            return {
                ...state,
                registroActualExjuab: action.payload,
            }
        case SET_FILTRO_EXJUAB:
            return {
                ...state,
                filtroExjuab: action.payload,
            }
        case SET_CAMPOS_FILTRO_EXJUAB:
            return {
                ...state,
                camposFiltroExjuab: action.payload,
            }
        case SET_ORDENACION_EXJUAB:
            return {
                ...state,
                ordenacionExjuab: action.payload,
            }
        /* TABLA EXJUTE */
        case SET_PAGINA_EXJUTE:
            return {
                ...state,
                paginaExjute: action.payload,
            }
        case SET_REGISTRO_ACTUAL_EXJUTE:
            return {
                ...state,
                registroActualExjute: action.payload,
            }
        case SET_FILTRO_EXJUTE:
            return {
                ...state,
                filtroExjute: action.payload,
            }
        case SET_CAMPOS_FILTRO_EXJUTE:
            return {
                ...state,
                camposFiltroExjute: action.payload,
            }

        case SET_ORDENACION_EXJUTE:
            return {
                ...state,
                ordenacionExjute: action.payload,
            }

        /* TABLA EXJURE */
        case SET_PAGINA_EXJURE:
            return {
                ...state,
                paginaExjure: action.payload,
            }
        case SET_REGISTRO_ACTUAL_EXJURE:
            return {
                ...state,
                registroActualExjure: action.payload,
            }
        case SET_FILTRO_EXJURE:
            return {
                ...state,
                filtroExjure: action.payload,
            }
        case SET_CAMPOS_FILTRO_EXJURE:
            return {
                ...state,
                camposFiltroExjure: action.payload,
            }

        case SET_ORDENACION_EXJURE:
            return {
                ...state,
                ordenacionExjure: action.payload,
            }

        default:
            return state
    }
}
