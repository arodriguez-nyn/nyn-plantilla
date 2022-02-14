import { useState } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaObras } from 'redux/actions/administracion-comercial'

import { contarRegistros } from 'services/common'

const useNavegacionObras = ({ obtenerRegistros }) => {
    const dispatch = useDispatch()
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [numeroLineas, setNumeroLineas] = useState(10)
    const { paginaObras, ordenacionObras, filtroObras } = useSelector(
        state => state.administracionComercialReducer
    )

    const handleSiguiente = () => {
        const pagina =
            paginaObras < numeroPaginas ? paginaObras + 1 : numeroPaginas

        if (pagina - 1 < numeroPaginas && numeroPaginas > 1) {
            dispatch(setPaginaObras(pagina))
            actualizarVista(filtroObras, pagina, ordenacionObras.nombre)
        }
    }

    const handleAnterior = () => {
        const pagina = paginaObras > 1 ? paginaObras - 1 : paginaObras

        if (pagina + 1 > 1 && numeroPaginas > 1) {
            dispatch(setPaginaObras(pagina))
            actualizarVista(filtroObras, pagina, ordenacionObras.nombre)
        }
    }

    const handlePrimero = () => {
        if (paginaObras > 1) {
            dispatch(setPaginaObras(1))
            actualizarVista(filtroObras, 1, ordenacionObras.nombre)
        }
    }

    const handleUltimo = () => {
        if (paginaObras < numeroPaginas) {
            dispatch(setPaginaObras(numeroPaginas))
            actualizarVista(filtroObras, numeroPaginas, ordenacionObras.nombre)
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
            await contarRegistros(ablFilter, 'obras').then(numeroRegistros => {
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

export default useNavegacionObras
