import { useState } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaExpeju } from 'redux/actions/juridica'

import { contarRegistros } from 'services/common'

const useNavegacionExpeju = ({ obtenerRegistros }) => {
    const dispatch = useDispatch()
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [numeroLineas, setNumeroLineas] = useState(10)
    const { paginaExpeju, ordenacionExpeju, filtroExpeju } = useSelector(
        state => state.juridicaReducer
    )

    const handleSiguiente = () => {
        const pagina =
            paginaExpeju < numeroPaginas ? paginaExpeju + 1 : numeroPaginas

        if (pagina - 1 < numeroPaginas && numeroPaginas > 1) {
            dispatch(setPaginaExpeju(pagina))
            actualizarVista(filtroExpeju, pagina, ordenacionExpeju.nombre)
        }
    }

    const handleAnterior = () => {
        const pagina = paginaExpeju > 1 ? paginaExpeju - 1 : paginaExpeju

        if (pagina + 1 > 1 && numeroPaginas > 1) {
            dispatch(setPaginaExpeju(pagina))
            actualizarVista(filtroExpeju, pagina, ordenacionExpeju.nombre)
        }
    }

    const handlePrimero = () => {
        if (paginaExpeju > 1) {
            dispatch(setPaginaExpeju(1))
            actualizarVista(filtroExpeju, 1, ordenacionExpeju.nombre)
        }
    }

    const handleUltimo = () => {
        if (paginaExpeju < numeroPaginas) {
            dispatch(setPaginaExpeju(numeroPaginas))
            actualizarVista(
                filtroExpeju,
                numeroPaginas,
                ordenacionExpeju.nombre
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
            await contarRegistros(ablFilter, 'expeju').then(numeroRegistros => {
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
