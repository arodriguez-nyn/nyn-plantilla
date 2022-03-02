import { useState } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaConsultaMM } from 'redux/actions/multimedia'

import { contarRegistros } from 'services/common'

const useNavegacionConsultaMM = ({ obtenerRegistros }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [numeroLineas, setNumeroLineas] = useState(20)
    const { paginaConsultaMM, ordenacionConsultaMM, filtroConsultaMM } =
        useSelector(state => state.multimediaReducer)

    const handleSiguiente = () => {
        const pagina =
            paginaConsultaMM < numeroPaginas
                ? paginaConsultaMM + 1
                : numeroPaginas

        if (pagina - 1 < numeroPaginas && numeroPaginas > 1) {
            dispatch(setPaginaConsultaMM(pagina))
            actualizarVista(
                filtroConsultaMM,
                pagina,
                ordenacionConsultaMM.nombre
            )
        }
    }

    const handleAnterior = () => {
        const pagina =
            paginaConsultaMM > 1 ? paginaConsultaMM - 1 : paginaConsultaMM

        if (pagina + 1 > 1 && numeroPaginas > 1) {
            dispatch(setPaginaConsultaMM(pagina))
            actualizarVista(
                filtroConsultaMM,
                pagina,
                ordenacionConsultaMM.nombre
            )
        }
    }

    const handlePrimero = () => {
        if (paginaConsultaMM > 1) {
            dispatch(setPaginaConsultaMM(1))
            actualizarVista(filtroConsultaMM, 1, ordenacionConsultaMM.nombre)
        }
    }

    const handleUltimo = async () => {
        if (paginaConsultaMM < numeroPaginas) {
            dispatch(setPaginaConsultaMM(numeroPaginas))
            actualizarVista(
                filtroConsultaMM,
                numeroPaginas,
                ordenacionConsultaMM.nombre
            )
        }
    }

    const modificaNumeroLineas = lineas => {
        setNumeroLineas(lineas)
        actualizarVista(
            filtroConsultaMM,
            paginaConsultaMM,
            ordenacionConsultaMM.nombre,
            lineas
        )
    }

    const obtenerNumeroRegistros = async (ablFilter, numeroLineas) => {
        try {
            await contarRegistros(ablFilter, 'consultaObraMM').then(
                numeroRegistros => {
                    console.log('numeroRegistros', numeroRegistros)
                    if (numeroRegistros < numeroLineas) {
                        setNumeroPaginas(1)
                    } else if (numeroRegistros % numeroLineas === 0) {
                        setNumeroPaginas(
                            Math.round(numeroRegistros / numeroLineas)
                        )
                    } else {
                        setNumeroPaginas(
                            Math.trunc(numeroRegistros / numeroLineas) + 1
                        )
                    }
                    setNumeroRegistros(numeroRegistros)
                }
            )
        } catch (error) {
            setNumeroPaginas(1)
            setNumeroRegistros(null)
        }
    }

    const actualizarVista = async (
        ablFilter = '',
        pagina = 1,
        ordenacion = '',
        numeroLineas = 20
    ) => {
        setLoading(true)
        const filtro = {
            skip: numeroLineas * (pagina - 1),
            top: parseInt(numeroLineas),
            filter: ablFilter,
            sort: [ordenacion],
        }

        try {
            await Promise.all([
                obtenerRegistros(filtro),
                obtenerNumeroRegistros(ablFilter, numeroLineas),
            ])
            setLoading(false)
            // await obtenerRegistros(filtro)
            // await obtenerNumeroRegistros(ablFilter, numeroLineas)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return {
        numeroPaginas,
        numeroRegistros,
        numeroLineas,
        loading,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        modificaNumeroLineas,
        actualizarVista,
        obtenerNumeroRegistros,
    }
}

export default useNavegacionConsultaMM
