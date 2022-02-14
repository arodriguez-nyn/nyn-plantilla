import { useState } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaExjute } from 'redux/actions/juridica'

import { contarRegistros } from 'services/common'

const useNavegacionExjute = ({ obtenerRegistros }) => {
    const dispatch = useDispatch()
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [numeroLineas, setNumeroLineas] = useState(10)
    const { paginaExjute, ordenacionExjute, filtroExjute } = useSelector(
        state => state.juridicaReducer
    )

    const handleSiguiente = () => {
        const pagina =
            paginaExjute < numeroPaginas ? paginaExjute + 1 : numeroPaginas

        if (pagina - 1 < numeroPaginas && numeroPaginas > 1) {
            dispatch(setPaginaExjute(pagina))
            actualizarVista(filtroExjute, pagina, ordenacionExjute.nombre)
        }
    }

    const handleAnterior = () => {
        const pagina = paginaExjute > 1 ? paginaExjute - 1 : paginaExjute

        if (pagina + 1 > 1 && numeroPaginas > 1) {
            dispatch(setPaginaExjute(pagina))
            actualizarVista(filtroExjute, pagina, ordenacionExjute.nombre)
        }
    }

    const handlePrimero = () => {
        if (paginaExjute > 1) {
            dispatch(setPaginaExjute(1))
            actualizarVista(filtroExjute, 1, ordenacionExjute.nombre)
        }
    }

    const handleUltimo = () => {
        if (paginaExjute < numeroPaginas) {
            dispatch(setPaginaExjute(numeroPaginas))
            actualizarVista(
                filtroExjute,
                numeroPaginas,
                ordenacionExjute.nombre
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
            await contarRegistros(ablFilter, 'exjute').then(numeroRegistros => {
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

export default useNavegacionExjute
