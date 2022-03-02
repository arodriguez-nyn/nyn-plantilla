import { useState } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import {
    setFiltroConsultaMM,
    setCamposFiltroConsultaMM,
    setPaginaConsultaMM,
} from 'redux/actions/multimedia'

// Componentes
import Switch from '@mui/material/Switch'
import { SelectAuxiliaresSimple, SelectAuxiliares } from './SelectAuxiliares'
import { estados, operaciones, tiposEntidad } from './filtrosSelecciones'

// Servicios
import { obtenerRegistrosAuxiliar } from 'services/auxiliares'

// Dependencias
import NumberFormat from 'react-number-format'

import './styles.css'

const FiltroConsultaObrasMM = ({ actualizarVista }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [filtroExpandido, setFiltroExpandido] = useState(true)
    const dispatch = useDispatch()
    const { camposFiltroConsultaMM, ordenacionConsultaMM } = useSelector(
        state => state.multimediaReducer
    )
    const [inputFiltro, setInputFiltro] = useState(
        // camposFiltroConsultaMM
        //     ? {
        //           codent: camposFiltroConsultaMM.CODENT,
        //           obra: camposFiltroConsultaMM.OBRA,
        //           estado: camposFiltroConsultaMM.ESTADO,
        //           tipoEntidad: camposFiltroConsultaMM.CODIDE,
        //           operacion: camposFiltroConsultaMM.CLAENT,
        //           precioDesde: camposFiltroConsultaMM.PRECIO_ALQUILER_DESDE,
        //           precioHasta: camposFiltroConsultaMM.PRECIO_ALQUILER_HASTA,
        //           superficieDesde:
        //               camposFiltroConsultaMM.SUPERFICIE_CONSTRUIDA_DESDE,
        //           superficieHasta:
        //               camposFiltroConsultaMM.SUPERFICIE_CONSTRUIDA_HASTA,
        //           zona: camposFiltroConsultaMM.CODZON,
        //           provincia: camposFiltroConsultaMM.PROVIN,
        //           calle: camposFiltroConsultaMM.NOMDES,
        //           incluirAlquiladas: camposFiltroConsultaMM.INCLUIR_ALQUILADAS,
        //           viviendasOTerciarios:
        //               camposFiltroConsultaMM.VIVIENDAS_TERCIARIOS,
        //       } :
        {
            codent: 0,
            obra: 0,
            estado: '',
            tipoEntidad: '',
            operacion: 0,
            precioDesde: 0,
            precioHasta: 0,
            superficieDesde: 0,
            superficieHasta: 0,
            zona: 0,
            calle: '',
            provincia: 0,
            incluirAlquiladas: false,
            viviendasOTerciarios: '',
            habitacionesDesde: 0,
            habitacionesHasta: 0,
        }
    )
    const {
        codent,
        obra,
        estado,
        precioDesde,
        precioHasta,
        superficieDesde,
        superficieHasta,
        zona,
        provincia,
        calle,
        incluirAlquiladas,
        habitacionesDesde,
        habitacionesHasta,
        viviendasOTerciarios,
        tipoEntidad,
    } = inputFiltro

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const changeOperacion = inputValue => {
        if (!inputValue) {
            setInputFiltro({
                ...inputFiltro,
                operacion: '',
            })
            return
        }

        setInputFiltro({
            ...inputFiltro,
            operacion: inputValue.label,
        })
    }

    const changeEstado = inputValue => {
        if (!inputValue) {
            setInputFiltro({
                ...inputFiltro,
                estado: '',
            })
            return
        }

        setInputFiltro({
            ...inputFiltro,
            estado: inputValue.label,
        })
    }

    const changeTipoEntidad = inputValue => {
        if (!inputValue) {
            setInputFiltro({
                ...inputFiltro,
                tipoEntidad: '',
            })
            return
        }

        setInputFiltro({
            ...inputFiltro,
            tipoEntidad: inputValue.label,
        })
    }

    const obtieneAuxiliarObras = searchValue => {
        let listaSelect = null

        if (searchValue.length < 3) return

        const filtro = isNaN(searchValue)
            ? `CAPS(NOMOBR) MATCHES '*${searchValue.toUpperCase()}*'`
            : `OBRA = ${searchValue} OR CAPS(NOMOBR) MATCHES '*${searchValue.toUpperCase()}*'`

        return obtenerRegistrosAuxiliar(filtro, 'obras').then(
            jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsOBRAS.ttOBRAS
                    if (lista) {
                        listaSelect = lista.map(registro => {
                            return {
                                value: registro.OBRA,
                                label: `${registro.OBRA} - ${registro.NOMOBR}`,
                            }
                        })
                    } else {
                        return null
                    }
                }
                return listaSelect
            },
            error => {
                return null
            }
        )
    }

    // const obtieneAuxiliarEntcla = searchValue => {
    //     let listaSelect = null

    //     if (searchValue.length < 3) return

    //     const filtro = `CAPS(ENTCLA.CONCEP) MATCHES '*${searchValue.toUpperCase()}*'`

    //     return obtenerRegistrosAuxiliar(filtro, 'entcla').then(
    //         jsdo => {
    //             const { success, request } = jsdo
    //             if (success) {
    //                 const lista = request.response.dsENTCLA.ttENTCLA
    //                 if (lista) {
    //                     listaSelect = lista.map(registro => {
    //                         return {
    //                             value: registro.CLAENT,
    //                             label: registro.CONCEP,
    //                         }
    //                     })
    //                 } else {
    //                     return null
    //                 }
    //             }
    //             return listaSelect
    //         },
    //         error => {
    //             return null
    //         }
    //     )
    // }

    // const obtieneAuxiliarEntcod = searchValue => {
    //     let listaSelect = null

    //     if (searchValue.length < 3) return

    //     const filtro = `CAPS(ENTCOD.DESCRI) MATCHES '*${searchValue.toUpperCase()}*'`

    //     return obtenerRegistrosAuxiliar(filtro, 'entcod').then(
    //         jsdo => {
    //             const { success, request } = jsdo
    //             if (success) {
    //                 const lista = request.response.dsENTCOD.ttENTCOD
    //                 if (lista) {
    //                     listaSelect = lista.map(registro => {
    //                         return {
    //                             value: registro.CODIDE,
    //                             label:
    //                                 registro.CONCEP + ' - ' + registro.DESCRI,
    //                         }
    //                     })
    //                 } else {
    //                     return null
    //                 }
    //             }
    //             return listaSelect
    //         },
    //         error => {
    //             return null
    //         }
    //     )
    // }

    const obtieneAuxiliarZonas = searchValue => {
        let listaSelect = null

        if (searchValue.length < 3) return

        const filtro = `CAPS(ZONAS.CONCEP) MATCHES '*${searchValue.toUpperCase()}*'`

        return obtenerRegistrosAuxiliar(filtro, 'zonas').then(
            jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsZONAS.ttZONAS
                    if (lista) {
                        listaSelect = lista.map(registro => {
                            return {
                                value: registro.CODZON,
                                label: registro.CONCEP,
                            }
                        })
                    } else {
                        return null
                    }
                }
                return listaSelect
            },
            error => {
                return null
            }
        )
    }

    const obtieneAuxiliarProvin = searchValue => {
        let listaSelect = null

        if (searchValue.length < 3) return

        const filtro = `CAPS(PROVIN.CONCEP) MATCHES '*${searchValue.toUpperCase()}*'`

        return obtenerRegistrosAuxiliar(filtro, 'provin').then(
            jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsPROVIN.ttPROVIN
                    if (lista) {
                        listaSelect = lista.map(registro => {
                            return {
                                value: registro.PROVIN,
                                label: registro.CONCEP,
                            }
                        })
                    } else {
                        return null
                    }
                }
                return listaSelect
            },
            error => {
                return null
            }
        )
    }

    const obtieneAuxiliarExiste = searchValue => {
        let listaSelect = null

        if (searchValue.length < 3) return

        const filtro = isNaN(searchValue)
            ? `CAPS(LITENT) MATCHES '*${searchValue.toUpperCase()}*'`
            : `CODENT = ${searchValue} OR CAPS(LITENT) MATCHES '*${searchValue.toUpperCase()}*'`

        return obtenerRegistrosAuxiliar(filtro, 'existe').then(
            jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsEXISTE.ttEXISTE
                    if (lista) {
                        listaSelect = lista.map(registro => {
                            return {
                                value: registro.CODENT,
                                label: `${registro.CODENT} - ${registro.LITENT}`,
                            }
                        })
                    } else {
                        return null
                    }
                }
                return listaSelect
            },
            error => {
                return null
            }
        )
    }

    const handleChange = e => {
        if (e.target.name === 'mm-viviendas-terciarios') {
            setInputFiltro({
                ...inputFiltro,
                viviendasOTerciarios: e.target.value,
            })
            /*} else if(e.target.name === 'estado'){
            setInputFiltro({
                ...inputFiltro,
                viviendasOTerciarios: e.target.value,
            })*/
        } else {
            let value = e.target.value
            if (
                e.target.name === 'superficieDesde' ||
                e.target.name === 'superficieHasta' ||
                e.target.name === 'precioDesde' ||
                e.target.name === 'precioHasta' ||
                e.target.name === 'habitacionesDesde' ||
                e.target.name === 'habitacionesHasta'
            ) {
                value =
                    isNaN(value) || value === '' ? 0 : parseInt(e.target.value)
            }

            setInputFiltro({
                ...inputFiltro,
                [e.target.name]: value,
            })
        }
    }

    const hancleCheck = e => {
        setInputFiltro({
            ...inputFiltro,
            incluirAlquiladas: e.target.checked,
        })
    }

    const getSelectedValueObras = inputValue => {
        if (inputValue) {
            const separador = inputValue.label.indexOf('-')
            const nombreObra = inputValue.label.substring(separador + 1)

            setInputFiltro({
                ...inputFiltro,
                obra: inputValue.value,
                nombreObra,
            })
        } else {
            setInputFiltro({
                ...inputFiltro,
                obra: 0,
                nombreObra: '',
            })
        }
    }

    const getSelectedValueExiste = inputValue => {
        if (inputValue) {
            const separador = inputValue.label.indexOf('-')
            const litent = inputValue.label.substring(separador + 1)

            setInputFiltro({
                ...inputFiltro,
                codent: inputValue.value,
                litent,
            })
        } else {
            setInputFiltro({
                ...inputFiltro,
                codent: 0,
                litent: '',
            })
        }
    }

    // const getSelectedValueEntcla = inputValue => {
    //     setInputFiltro({
    //         ...inputFiltro,
    //         operacion: inputValue.value,
    //     })
    // }

    // const getSelectedValueEntcod = inputValue => {
    //     const seleccion = inputValue ? inputValue : ''

    //     setInputFiltro({
    //         ...inputFiltro,
    //         tipoEntidad: seleccion.value,
    //     })
    // }

    const getSelectedValueProvin = inputValue => {
        const seleccion = inputValue ? inputValue : ''

        setInputFiltro({
            ...inputFiltro,
            provincia: seleccion.value,
        })
    }

    const getSelectedValueZonas = inputValue => {
        const seleccion = inputValue ? inputValue : ''

        setInputFiltro({
            ...inputFiltro,
            zona: seleccion.value,
        })
    }

    // console.log('inputFiltro', inputFiltro)

    const handleSubmit = e => {
        e.preventDefault()

        let filtroExiste = ''
        let filtroObras = ''
        let filtroEscasa = ''
        let filtroResto = ''

        //setFiltroExpandido(false)

        // Montamos los filtros
        const filtroEntidad =
            inputFiltro.codent === 0
                ? ''
                : `EXISTE.CODENT = ${inputFiltro.codent}`

        const filtroObra =
            inputFiltro.obra === 0 ? '' : `EXISTE.OBRGEN = ${inputFiltro.obra}`

        let filtroOperacion = ''
        switch (inputFiltro.operacion) {
            case 'VENTA':
                filtroOperacion = `(EXISTE.CLAENT = 1 OR EXISTE.CLAENT = 12)`
                break
            case 'ALQUILER':
                filtroOperacion = `(EXISTE.CLAENT = 1 OR EXISTE.CLAENT = 11)`
                break
            case 'VIVIENDA TEMPORAL':
                filtroOperacion = `EXISTE.CLAENT = 20`
                break
            default:
                filtroOperacion = ''
                break
        }

        let filtroViviendasTerciarios = ''
        if (viviendasOTerciarios !== '') {
            if (viviendasOTerciarios === 'V')
                filtroViviendasTerciarios = 'EXISTE.CODIDE2 = 0 '
            else if (viviendasOTerciarios === 'P') {
                filtroViviendasTerciarios =
                    'EXISTE.CODIDE2 = 4 OR EXISTE.CODIDE2 = 5'
            } else filtroViviendasTerciarios = 'EXISTE.CODIDE2 <> 0 '
        }

        const filtroProvincia = provincia === 0 ? '' : `PROVIN = ${provincia}`

        const filtroIncluirAlquiladas = incluirAlquiladas
            ? ''
            : ' EXISTE.TIPENT <> 2'

        const filtroCalle =
            calle === '' ? '' : `OBRAS.NOMDES MATCHES '*${calle}*'`

        let filtroTipoEntidad = ''
        if (tipoEntidad !== '') {
            switch (tipoEntidad) {
                case 'BODEGAS/TRASTEROS':
                    filtroTipoEntidad =
                        "(EXISTE.CODIDE = 'B' OR EXISTE.CODIDE = 'T')"
                    break
                case 'DESPACHOS':
                    filtroTipoEntidad =
                        "(EXISTE.CODIDE = 'I' OR EXISTE.CODIDE = 'D' OR EXISTE.CODIDE = 'G')"
                    break
                case 'HOTELES':
                    filtroTipoEntidad = "EXISTE.CODIDE = 'Y'"
                    break
                case 'LOCALES':
                    filtroTipoEntidad =
                        "(EXISTE.CODIDE = 'A' OR EXISTE.CODIDE = 'L' OR EXISTE.CODIDE = 'K')"
                    break
                case 'PARKINGS':
                    filtroTipoEntidad =
                        "(EXISTE.CODIDE = 'P' OR EXISTE.CODIDE = 'M' OR EXISTE.CODIDE = 'R')"
                    break
                case 'SOLARES':
                    filtroTipoEntidad = "EXISTE.CODIDE = 'S'"
                    break
                case 'VIVIENDAS':
                    filtroTipoEntidad =
                        "(EXISTE.CODIDE = 'F' OR EXISTE.CODIDE = 'VI' OR EXISTE.CODIDE = 'V' OR EXISTE.CODIDE = 'Z' OR EXISTE.CODIDE = 'ZI')"
                    break
                case 'VARIOS':
                    filtroTipoEntidad =
                        "EXISTE.CODIDE = 'Q' OR EXISTE.CODIDE = 'W' OR EXISTE.CODIDE = 'WE' OR EXISTE.CODIDE = 'IN'"
                    break
            }
        }

        // const filtroTipoEntidad =
        //     inputFiltro.tipoEntidad === ''
        //         ? ''
        //         : `EXISTE.CODIDE = '${inputFiltro.tipoEntidad}'`
        const filtroPrecioDesde = `IMPORTE_ALQUILER >= ${precioDesde}`

        const filtroPrecioHasta =
            precioHasta === 0 ? '' : `IMPORTE_ALQUILER <= ${precioHasta}`

        const filtroSuperficieDesde = `SUPERFICIE_CONSTRUIDA >= ${superficieDesde}`

        const filtroSuperficieHasta =
            superficieHasta === 0
                ? ''
                : `SUPERFICIE_CONSTRUIDA <= ${superficieHasta}`
        const filtroHabitacionesDesde = `NUMEST >= ${habitacionesDesde}`

        const filtroHabitacionesHasta =
            habitacionesHasta === 0 ? '' : `NUMEST <= ${habitacionesHasta}`

        const filtroZona = zona === 0 ? '' : `CODZON  = ${zona}`

        const filtroEstado = estado === '' ? '' : `ESTADO  = '${estado}'`

        /** Filtros de la tabla EXISTE */
        if (filtroEntidad !== '') {
            filtroExiste = `${filtroEntidad} `
        }

        if (filtroOperacion !== '') {
            filtroExiste =
                filtroExiste === ''
                    ? filtroOperacion
                    : `${filtroExiste} AND ${filtroOperacion}`
        }

        if (filtroObra !== '') {
            filtroExiste =
                filtroExiste === ''
                    ? filtroObra
                    : `${filtroExiste} AND ${filtroObra}`
        }

        if (filtroIncluirAlquiladas !== '') {
            filtroExiste =
                filtroExiste === ''
                    ? filtroIncluirAlquiladas
                    : `${filtroExiste} AND ${filtroIncluirAlquiladas}`
        }

        if (filtroTipoEntidad !== '') {
            filtroExiste =
                filtroExiste === ''
                    ? filtroTipoEntidad
                    : `${filtroExiste} AND ${filtroTipoEntidad}`
        }

        if (filtroZona !== '') {
            filtroExiste =
                filtroExiste === ''
                    ? filtroZona
                    : `${filtroExiste} AND ${filtroZona}`
        }

        if (filtroHabitacionesDesde !== '') {
            filtroExiste =
                filtroExiste === ''
                    ? filtroHabitacionesDesde
                    : `${filtroExiste} AND ${filtroHabitacionesDesde}`
        }

        if (filtroHabitacionesHasta !== '') {
            filtroExiste =
                filtroExiste === ''
                    ? filtroHabitacionesHasta
                    : `${filtroExiste} AND ${filtroHabitacionesHasta}`
        }

        if (filtroViviendasTerciarios !== '') {
            filtroExiste =
                filtroExiste === ''
                    ? filtroViviendasTerciarios
                    : `${filtroExiste} AND ${filtroViviendasTerciarios}`
        }

        /** Filtros de la tabla OBRAS */
        if (filtroCalle !== '') {
            filtroObras =
                filtroObras === ''
                    ? filtroCalle
                    : `${filtroObras} AND ${filtroCalle}`
        }

        /** Fitlros de la tabla ESCASA */
        if (filtroProvincia !== '') {
            filtroEscasa =
                filtroEscasa === ''
                    ? filtroProvincia
                    : `${filtroEscasa} AND ${filtroProvincia}`
        }

        /** Filtro Resto - Campos calculados */
        if (filtroPrecioDesde !== '') {
            filtroResto =
                filtroResto === ''
                    ? filtroPrecioDesde
                    : `${filtroResto} AND ${filtroPrecioDesde}`
        }

        if (filtroPrecioHasta !== '') {
            filtroResto =
                filtroResto === ''
                    ? filtroPrecioHasta
                    : `${filtroResto} AND ${filtroPrecioHasta}`
        }

        if (filtroSuperficieDesde !== '') {
            filtroResto =
                filtroResto === ''
                    ? filtroSuperficieDesde
                    : `${filtroResto} AND ${filtroSuperficieDesde}`
        }

        if (filtroSuperficieHasta !== '') {
            filtroResto =
                filtroResto === ''
                    ? filtroSuperficieHasta
                    : `${filtroResto} AND ${filtroSuperficieHasta}`
        }

        if (filtroEstado !== '') {
            filtroResto =
                filtroResto === ''
                    ? filtroEstado
                    : `${filtroResto} AND ${filtroEstado}`
        }

        // Guardamos en el contexto para recuperarlo al reentrar en la pantalla
        // dispatch(
        //     setCamposFiltroConsultaMM({
        //         CODENT: inputFiltro.codent,
        //         OBRGEN: inputFiltro.obra,
        //         NOMDES: inputFiltro.calle,
        //         ESTADO: inputFiltro.estado,
        //         CODIDE: inputFiltro.tipoEntidad,
        //         CLAENT: inputFiltro.operacion,
        //         PRECIO_ALQUILER_DESDE: inputFiltro.precioDesde,
        //         PRECIO_ALQUILER_HASTA: inputFiltro.precioHasta,
        //         SUPERFICIE_CONSTRUIDA_DESDE: inputFiltro.superficieDesde,
        //         SUPERFICIE_CONSTRUIDA_HASTA: inputFiltro.superficieHasta,
        //         NOMBRE_ZONA: inputFiltro.zona,
        //         PROVIN: inputFiltro.provincia,
        //     })
        // )

        let ablFilter = 'filtroExiste:'
        if (filtroExiste !== '') {
            ablFilter += filtroExiste
        }

        ablFilter += `, filtroObras:`
        if (filtroObras) {
            ablFilter += filtroObras
        }

        ablFilter += `, filtroEscasa:`
        if (filtroEscasa) {
            ablFilter += filtroEscasa
        }

        ablFilter += `, filtroResto:`
        if (filtroResto) {
            ablFilter += filtroResto
        }

        console.log('ablFilter', ablFilter)

        actualizarVista(ablFilter, 1, ordenacionConsultaMM.codent)
        dispatch(setPaginaConsultaMM(1))
        dispatch(setFiltroConsultaMM(ablFilter))

        // setInputFiltro({
        //     codent: 0,
        //     litent: '',
        //     obra: 0,
        //     estado: '',
        //     tipoEntidad: '',
        //     operacion: 0,
        //     precioDesde: 0,
        //     precioHasta: 0,
        //     superficieDesde: 0,
        //     superficieHasta: 0,
        //     zona: 0,
        //     calle: '',
        //     provincia: 0,
        //     incluirAlquiladas: false,
        //     viviendasOTerciarios: '',
        //     habitacionesDesde: 0,
        //     habitacionesHasta: 0,
        // })
    }

    const handleLimpiar = () => {
        // setFiltroExpandido(false)
        setInputFiltro({
            codent: 0,
            litent: '',
            obra: 0,
            estado: '',
            tipoEntidad: '',
            operacion: 0,
            precioDesde: 0,
            precioHasta: 0,
            superficieDesde: 0,
            superficieHasta: 0,
            zona: 0,
            calle: '',
            provincia: 0,
            incluirAlquiladas: false,
            viviendasOTerciarios: '',
            habitacionesDesde: 0,
            habitacionesHasta: 0,
        })

        // actualizarVista('', 1, ordenacionConsultaMM.nombre)
        dispatch(setCamposFiltroConsultaMM(null))
        dispatch(setFiltroConsultaMM(''))
    }

    // useEffect(() => {
    //     camposFiltroConsultaMM &&
    //         setInputFiltro({
    //             codent: camposFiltroConsultaMM.CODENT,
    //             litent: camposFiltroConsultaMM.LITENT,
    //             obra: camposFiltroConsultaMM.OBRGEN,
    //             estado: camposFiltroConsultaMM.ESTADO,
    //             tipoEntidad: camposFiltroConsultaMM.CODIDE,
    //             operacion: camposFiltroConsultaMM.CLAENT,
    //             precioDesde: camposFiltroConsultaMM.PRECIO_ALQUILER_DESDE,
    //             precioHasta: camposFiltroConsultaMM.PRECIO_ALQUILER_HASTA,
    //             superficieDesde:
    //                 camposFiltroConsultaMM.SUPERFICIE_CONSTRUIDA_DESDE,
    //             superficieHasta:
    //                 camposFiltroConsultaMM.SUPERFICIE_CONSTRUIDA_HASTA,
    //             zona: camposFiltroConsultaMM.NOMBRE_ZONA,
    //             provincia: camposFiltroConsultaMM.PROVIN,
    //             calle: camposFiltroConsultaMM.NOMDES,
    //         })
    // }, [camposFiltroConsultaMM])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <div className='contenedor-filtro'>
            <header className='contenedor-filtro__header'>
                <h1 className='contendor-filtro__h1'>Filtros</h1>
                <span
                    className='contendor-filtro__toggle'
                    onClick={() => setFiltroExpandido(!filtroExpandido)}
                >
                    <i className='fas fa-bars fa-lg'></i>
                </span>
            </header>
            {filtroExpandido && (
                <form onSubmit={handleSubmit}>
                    <main className='contenedor-filtro__main'>
                        <div className='viviendas-terciarios'>
                            <div className='viviendas-terciarios_grupo'>
                                <label
                                    htmlFor='mm-filtro-viviendas'
                                    className='form__label viviendas-terciarios__label'
                                >
                                    Viviendas:
                                </label>
                                <input
                                    type='radio'
                                    className='viviendas-terciarios__input'
                                    id='mm-filtro-viviendas'
                                    name='mm-viviendas-terciarios'
                                    value='V'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='viviendas-terciarios_grupo'>
                                <label
                                    htmlFor='mm-filtro-parkings'
                                    className='form__label viviendas-terciarios__label'
                                >
                                    Párkings:
                                </label>
                                <input
                                    type='radio'
                                    className='viviendas-terciarios__input'
                                    id='mm-filtro-parkings'
                                    name='mm-viviendas-terciarios'
                                    value='P'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='viviendas-terciarios_grupo'>
                                <label
                                    htmlFor='mm-filtro-terciarios'
                                    className='form__label viviendas-terciarios__label'
                                >
                                    Terciarios:
                                </label>
                                <input
                                    type='radio'
                                    className='viviendas-terciarios__input'
                                    id='mm-filtro-terciarios'
                                    name='mm-viviendas-terciarios'
                                    value='T'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='viviendas-terciarios_grupo'>
                                <label
                                    htmlFor='mm-filtro-todos'
                                    className='form__label viviendas-terciarios__label'
                                >
                                    Todos:
                                </label>
                                <input
                                    type='radio'
                                    className='viviendas-terciarios__input'
                                    id='mm-filtro-todos'
                                    name='mm-viviendas-terciarios'
                                    value=''
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='grid col-3'>
                            <div>
                                <label
                                    htmlFor='mm-filtro-obra'
                                    className='form__label'
                                >
                                    Obra:
                                </label>
                                <SelectAuxiliares
                                    id='mm-filtro-obra'
                                    name='obra'
                                    value={obra}
                                    loadOptions={obtieneAuxiliarObras}
                                    getSelectedValue={getSelectedValueObras}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='mm-filtro-entidad'
                                    className='form__label'
                                >
                                    Entidad:
                                </label>
                                <SelectAuxiliares
                                    name='codent'
                                    value={codent}
                                    loadOptions={obtieneAuxiliarExiste}
                                    getSelectedValue={getSelectedValueExiste}
                                />
                            </div>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-calle'
                                    className='form__label'
                                >
                                    Calle:
                                </label>
                                <input
                                    className='form__input form-filter__input'
                                    id='mm-filtro-calle'
                                    type='text'
                                    name='calle'
                                    value={calle}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='grid col-3'>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-operación'
                                    className='form__label'
                                >
                                    Operación:
                                </label>
                                <SelectAuxiliaresSimple
                                    options={operaciones}
                                    changeSelection={changeOperacion}
                                />
                            </div>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-provin'
                                    className='form__label'
                                >
                                    Provincia:
                                </label>
                                <SelectAuxiliares
                                    id='mm-filtro-provin'
                                    name='provincia'
                                    value={provincia}
                                    loadOptions={obtieneAuxiliarProvin}
                                    getSelectedValue={getSelectedValueProvin}
                                />
                            </div>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-codide'
                                    className='form__label'
                                >
                                    Tipo Entidad:
                                </label>
                                <SelectAuxiliaresSimple
                                    id='mm-filtro-codide'
                                    options={tiposEntidad}
                                    isMulti={false}
                                    changeSelection={changeTipoEntidad}
                                />
                                {/* <SelectAuxiliares
                                    id='mm-filtro-codide'
                                    name='tipoEntidad'
                                    value={tipoEntidad}
                                    loadOptions={obtieneAuxiliarEntcod}
                                    getSelectedValue={getSelectedValueEntcod}
                                /> */}
                            </div>
                        </div>
                        <div className='grid col-3'>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-zonas'
                                    className='form__label'
                                >
                                    Zona:
                                </label>
                                <SelectAuxiliares
                                    id='mm-filtro-zonas'
                                    name='zona'
                                    value={zona}
                                    loadOptions={obtieneAuxiliarZonas}
                                    getSelectedValue={getSelectedValueZonas}
                                />
                            </div>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-estado'
                                    className='form__label'
                                >
                                    Estado:
                                </label>
                                <SelectAuxiliaresSimple
                                    options={estados}
                                    changeSelection={changeEstado}
                                />
                                {/* <select
                                    className='selector'
                                    name='estado'
                                    value={estado}
                                    onChange={handleChange}
                                >
                                    <option>Todos</option>
                                    <option>Depósito</option>
                                    <option>Reserva</option>
                                    <option>Preferente</option>
                                </select> */}
                            </div>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-habsd'
                                    className='form__label'
                                >
                                    Habitaciones Desde:
                                </label>
                                <NumberFormat
                                    id='mm-filtro-habsd'
                                    name='habitacionesDesde'
                                    value={habitacionesDesde}
                                    className='form__input form-filter__input'
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onChange={handleChange}
                                />
                                {/* <input
                                    className='form__input form-filter__input'
                                    id='mm-filtro-habsd'
                                    type='number'
                                    name='habitacionesDesde'
                                    value={habitacionesDesde}
                                    onChange={handleChange}
                                /> */}
                            </div>
                        </div>
                        <div className='grid col-3'>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-habsh'
                                    className='form__label'
                                >
                                    Habitaciones Hasta:
                                </label>
                                <NumberFormat
                                    className='form__input form-filter__input'
                                    id='mm-filtro-habsh'
                                    name='habitacionesHasta'
                                    value={habitacionesHasta}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onChange={handleChange}
                                />
                                {/* <input
                                    className='form__input form-filter__input'
                                    id='mm-filtro-habsh'
                                    name='habitacionesHasta'
                                    value={habitacionesHasta}
                                    type='number'
                                    onChange={handleChange}
                                /> */}
                            </div>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-preciod'
                                    className='form__label'
                                >
                                    Precio Desde:
                                </label>
                                <NumberFormat
                                    className='form__input form-filter__input'
                                    id='mm-filtro-preciod'
                                    name='precioDesde'
                                    value={precioDesde}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onChange={handleChange}
                                />
                                {/* <input
                                    className='form__input form-filter__input'
                                    id='mm-filtro-preciod'
                                    name='precioDesde'
                                    value={precioDesde}
                                    type='number'
                                    onChange={handleChange}
                                /> */}
                            </div>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-precioh'
                                    className='form__label'
                                >
                                    Precio Hasta:
                                </label>
                                <NumberFormat
                                    className='form__input form-filter__input'
                                    id='mm-filtro-precioh'
                                    name='precioHasta'
                                    value={precioHasta}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onChange={handleChange}
                                />
                                {/* <input
                                    className='form__input form-filter__input'
                                    id='mm-filtro-precioh'
                                    name='precioHasta'
                                    value={precioHasta}
                                    type='number'
                                    onChange={handleChange}
                                /> */}
                            </div>
                        </div>
                        <div className='grid col-3'>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-preciod'
                                    className='form__label'
                                >
                                    Superficie Desde:
                                </label>
                                <NumberFormat
                                    id='mm-filtro-superficied'
                                    name='superficieDesde'
                                    value={superficieDesde}
                                    className='form__input form-filter__input'
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onChange={handleChange}
                                />
                                {/* <input
                                    className='form__input form-filter__input'
                                    id='mm-filtro-superficied'
                                    type='number'
                                    name='superficieDesde'
                                    value={superficieDesde}
                                    onChange={handleChange}
                                /> */}
                            </div>
                            <div className='grid col-1'>
                                <label
                                    htmlFor='mm-filtro-superficieh'
                                    className='form__label'
                                >
                                    Superficie Hasta:
                                </label>
                                <NumberFormat
                                    className='form__input form-filter__input'
                                    id='mm-filtro-superficieh'
                                    name='superficieHasta'
                                    value={superficieHasta}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    onChange={handleChange}
                                />
                                {/* <input
                                    className='form__input form-filter__input'
                                    id='mm-filtro-superficieh'
                                    type='number'
                                    name='superficieHasta'
                                    value={superficieHasta}
                                    onChange={handleChange}
                                /> */}
                            </div>
                            <div className='grid col-1'>
                                <div className='incluir-alquiladas'>
                                    <label
                                        htmlFor='mm-filtro-precioh'
                                        className='form__label incluir-alquiladas__label'
                                    >
                                        Incluir Alquiladas:
                                    </label>
                                    <Switch
                                        checked={incluirAlquiladas}
                                        onChange={hancleCheck}
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className='contenedor-filtro__footer'>
                        <button className='btn' width='120px' type='submit'>
                            Aplicar
                        </button>
                        {/* <button
                            className='btn contenedor-filtro__last-btn'
                            type='button'
                            onClick={handleLimpiar}
                        >
                            Limpiar
                        </button> */}
                    </footer>
                </form>
            )}
        </div>
    )
}

export default FiltroConsultaObrasMM
