import {
    SET_PAGINA_OBRAS,
    SET_REGISTRO_ACTUAL_OBRAS,
    SET_ORDENACION_OBRAS,
    SET_FILTRO_OBRAS,
    SET_CAMPOS_FILTRO_OBRAS,
} from 'redux/types/administracion-comercial'

const initialState = {
    paginaObras: 1,
    registroActualObras: null,
    ordenacionObras: {
        nombre: 'NOMOBR',
        descripcion: 'Obra',
    },
    filtroObras: '',
    camposFiltroObras: null,
}

export const administracionComercialReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        /* TABLA OBRAS */
        case SET_PAGINA_OBRAS:
            return {
                ...state,
                paginaObras: action.payload,
            }
        case SET_REGISTRO_ACTUAL_OBRAS:
            return {
                ...state,
                registroActualObras: action.payload,
            }
        case SET_FILTRO_OBRAS:
            return {
                ...state,
                filtroObras: action.payload,
            }
        case SET_CAMPOS_FILTRO_OBRAS:
            return {
                ...state,
                camposFiltroObras: action.payload,
            }
        case SET_ORDENACION_OBRAS:
            return {
                ...state,
                ordenacionObras: action.payload,
            }

        default:
            return state
    }
}
