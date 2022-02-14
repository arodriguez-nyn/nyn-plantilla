import { useState } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaExjure } from 'redux/actions/juridica'

import { contarRegistros } from 'services/common'

const useNavegacionExjure = ({ obtenerRegistros }) => {
    const dispatch = useDispatch()
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [numeroLineas, setNumeroLineas] = useState(10)
    const { paginaExjure, ordenacionExjure, filtroExjure } = useSelector(
        state => state.juridicaReducer
    )

    const handleSiguiente = () => {
        const pagina =
            paginaExjure < numeroPaginas ? paginaExjure + 1 : numeroPaginas

        if (pagina - 1 < numeroPaginas && numeroPaginas > 1) {
            dispatch(setPaginaExjure(pagina))
            actualizarVista(filtroExjure, pagina, ordenacionExjure.nombre)
        }
    }

    const handleAnterior = () => {
        const pagina = paginaExjure > 1 ? paginaExjure - 1 : paginaExjure

        if (pagina + 1 > 1 && numeroPaginas > 1) {
            dispatch(setPaginaExjure(pagina))
            actualizarVista(filtroExjure, pagina, ordenacionExjure.nombre)
        }
    }

    const handlePrimero = () => {
        if (paginaExjure > 1) {
            dispatch(setPaginaExjure(1))
            actualizarVista(filtroExjure, 1, ordenacionExjure.nombre)
        }
    }

    const handleUltimo = () => {
        if (paginaExjure < numeroPaginas) {
            dispatch(setPaginaExjure(numeroPaginas))
            actualizarVista(
                filtroExjure,
                numeroPaginas,
                ordenacionExjure.nombre
            )
        }
    }

    const modificaNumeroLineas = lineas => {
        setNumeroLineas(lineas)
    }

    const actualizarVista = async (
        ablFilter = '',
        pagina = 1,
        ordenacion = ''
    ) => {
        const filtro = {
            skip: numeroLineas * (pagina - 1),
            top: parseInt(numeroLineas),
            filter: ablFilter,
            sort: [ordenacion],
        }

        try {
            await obtenerRegistros(filtro)
            await contarRegistros(ablFilter, 'exjure').then(numeroRegistros => {
                if (numeroRegistros < numeroLineas) {
                    setNumeroPaginas(1)
                } else if (numeroRegistros % numeroLineas === 0) {
                    setNumeroPaginas(Math.round(numeroRegistros / numeroLineas))
                } else {
                    setNumeroPaginas(
                        Math.trunc(numeroRegistros / numeroLineas) + 1
                    )
                }
                setNumeroRegistros(numeroRegistros)
            })
        } catch (error) {
            setNumeroPaginas(1)
            setNumeroRegistros(null)
        }
    }

    return {
        numeroPaginas,
        numeroRegistros,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        modificaNumeroLineas,
        actualizarVista,
    }
}

export default useNavegacionExjure
