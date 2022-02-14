import { useState } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaExjuab } from 'redux/actions/juridica'

import { contarRegistros } from 'services/common'

const useNavegacionExpeju = ({ obtenerRegistros }) => {
    const dispatch = useDispatch()
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [numeroLineas, setNumeroLineas] = useState(10)
    const { paginaExjuab, ordenacionExjuab, filtroExjuab } = useSelector(
        state => state.juridicaReducer
    )

    const handleSiguiente = () => {
        const pagina =
            paginaExjuab < numeroPaginas ? paginaExjuab + 1 : numeroPaginas

        if (pagina - 1 < numeroPaginas && numeroPaginas > 1) {
            dispatch(setPaginaExjuab(pagina))
            actualizarVista(filtroExjuab, pagina, ordenacionExjuab.nombre)
        }
    }

    const handleAnterior = () => {
        const pagina = paginaExjuab > 1 ? paginaExjuab - 1 : paginaExjuab

        if (pagina + 1 > 1 && numeroPaginas > 1) {
            dispatch(setPaginaExjuab(pagina))
            actualizarVista(filtroExjuab, pagina, ordenacionExjuab.nombre)
        }
    }

    const handlePrimero = () => {
        if (paginaExjuab > 1) {
            dispatch(setPaginaExjuab(1))
            actualizarVista(filtroExjuab, 1, ordenacionExjuab.nombre)
        }
    }

    const handleUltimo = () => {
        if (paginaExjuab < numeroPaginas) {
            dispatch(setPaginaExjuab(numeroPaginas))
            actualizarVista(
                filtroExjuab,
                numeroPaginas,
                ordenacionExjuab.nombre
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
            await contarRegistros(ablFilter, 'exjuab').then(numeroRegistros => {
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

export default useNavegacionExpeju
