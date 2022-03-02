import { useContext, useState } from 'react'

// Servicios
import { obtenerRegistrosConsultaMM } from 'services/multimedia'

// Dependencias
import { useHistory } from 'react-router-dom'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import AuthContext from 'context/AuthContext'

// Hooks
import useNavegacionConsultaMM from 'hooks/navegacion/useNavegacionMM'

// Componentes
import Navegacion from 'components/Navegacion'
import ModalLoading from 'components/modals/ModalLoading'
import ListaConsulta from 'components/multimedia/ListaConsulta'
import FiltroConsultaObrasMM from 'components/filtros/FiltroConsultaObrasMM'
import { setOrdenacionConsultaMM } from 'redux/actions/multimedia'

import { ordenaArray } from 'helpers'

const Multimedia = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [mensaje, setMensaje] = useState('')
    const [lista, setLista] = useState([])
    const { usuario } = useContext(AuthContext)
    // const [loading, setLoading] = useState(false)
    const { paginaConsultaMM, ordenacionConsultaMM, filtroConsultaMM } =
        useSelector(state => state.multimediaReducer)
    const history = useHistory()
    const dispatch = useDispatch()
    const { guardaUsuario } = useContext(AuthContext)
    const listaOrdenacion = [
        'Entidad',
        'Entidad Desc',
        'Literal',
        'Literal Desc',
        'Hab',
        'Hab Desc',
        'Orient',
        'Orient Desc',
        'Sup. Const.',
        'Sup. Const. Desc',
        'Terrazas',
        'Terrazas Desc',
        'Elem. Com.',
        'Elem. Com. Desc',
        'Patios',
        'Patios Desc',
        'Varios',
        'Varios Desc',
        'Sup. Total',
        'Sup. Total Desc',
        'Alquiler',
        'Alquiler Desc',
        'IBI Mes',
        'IBI Mes Desc',
        'Gts Com.',
        'Gts Com. Desc',
        'AA',
        'AA Desc',
        'Inst',
        'Inst Desc',
        'Tot Alq.',
        'Tot Alq. Desc',
        'Valoración',
        'Valoración Desc',
        'Hipoteca',
        'Hipoteca Desc',
        'Depósito',
        'Depósito Desc',
        'Alarma',
        'Alarma Desc',
    ]

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = (filtro = '') => {
        if (!usuario) return

        setLista(null)
        // setLoading(true)

        obtenerRegistrosConsultaMM(filtro).then(
            jsdo => {
                // setLoading(false)
                if (!jsdo) {
                    // Sesión caducada
                    guardaUsuario(null)
                    history.push('/')
                    return
                }

                const { success, request } = jsdo
                if (success) {
                    const listaDevuelta = request.response.dsEXISTE.ttEXISTE
                    console.log(listaDevuelta)
                    if (listaDevuelta) {
                        let ordenacion =
                            filtro.sort && filtro.sort[0] !== ''
                                ? filtro.sort[0]
                                : 'CODENT'

                        listaDevuelta.sort(ordenaArray(ordenacion))
                        setMensaje(null)
                        setLista(listaDevuelta)
                    } else {
                        setMensaje(
                            'No se han encontrado registros para esta selección.'
                        )
                        setLista(null)
                    }
                }
                return jsdo
            },
            error => {
                // setLoading(false)
                return error
            }
        )
    }

    const actualizar = (ablFilter = '', pagina, ordenacion = '') => {
        actualizarVista(ablFilter, pagina, ordenacion)
        //obtenerNumeroRegistros(ablFilter)
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Entidad':
                campoOrdenacion = {
                    nombre: 'CODENT',
                    descripcion: 'Entidad',
                }
                break
            case 'Entidad Desc':
                campoOrdenacion = {
                    nombre: 'CODENT DESC',
                    descripcion: 'Entidad Desc',
                }
                break
            case 'Literal':
                campoOrdenacion = {
                    nombre: 'LITENT',
                    descripcion: 'Literal',
                }
                break
            case 'Literal Desc':
                campoOrdenacion = {
                    nombre: 'LITENT DESC',
                    descripcion: 'Literal Desc',
                }
                break
            case 'Hab':
                campoOrdenacion = {
                    nombre: 'NUMEST',
                    descripcion: 'Hab',
                }
                break
            case 'Hab Desc':
                campoOrdenacion = {
                    nombre: 'NUMEST DESC',
                    descripcion: 'Hab Desc',
                }
                break
            case 'Orient':
                campoOrdenacion = {
                    nombre: 'ORIENT',
                    descripcion: 'Orient',
                }
                break
            case 'Orient Desc':
                campoOrdenacion = {
                    nombre: 'ORIENT DESC',
                    descripcion: 'Orient Desc',
                }
                break
            case 'Sup. Const.':
                campoOrdenacion = {
                    nombre: 'SUPERFICIE_CONSTRUIDA',
                    descripcion: 'Sup. Const.',
                }
                break
            case 'Sup. Const. Desc':
                campoOrdenacion = {
                    nombre: 'SUPERFICIE_CONSTRUIDA DESC',
                    descripcion: 'Sup. Const. Desc',
                }
                break
            case 'Terrazas':
                campoOrdenacion = {
                    nombre: 'TERRAZAS',
                    descripcion: 'Terrazas',
                }
                break
            case 'Terrazas Desc':
                campoOrdenacion = {
                    nombre: 'TERRAZAS DESC',
                    descripcion: 'Terrazas Desc',
                }
                break
            case 'Elem. Com.':
                campoOrdenacion = {
                    nombre: 'SUP_ELEMENTOS_COMUNES',
                    descripcion: 'Elem. Com.',
                }
                break
            case 'Elem. Com. Desc':
                campoOrdenacion = {
                    nombre: 'SUP_ELEMENTOS_COMUNES DESC',
                    descripcion: 'Elem. Com. Desc',
                }
                break
            case 'Patios':
                campoOrdenacion = {
                    nombre: 'PATIO',
                    descripcion: 'Patios',
                }
                break
            case 'Patios Desc':
                campoOrdenacion = {
                    nombre: 'PATIO DESC',
                    descripcion: 'Patios Desc',
                }
                break
            case 'Varios':
                campoOrdenacion = {
                    nombre: 'VARIOS',
                    descripcion: 'Varios',
                }
                break
            case 'Varios Desc':
                campoOrdenacion = {
                    nombre: 'VARIOS DESC',
                    descripcion: 'Varios Desc',
                }
                break
            case 'Sup. Total':
                campoOrdenacion = {
                    nombre: 'SUPERFICIE_TOTAL',
                    descripcion: 'Sup. Total',
                }
                break
            case 'Sup. Total Desc':
                campoOrdenacion = {
                    nombre: 'SUPERFICIE_TOTAL DESC',
                    descripcion: 'Sup. Total Desc',
                }
                break
            case 'Alquiler':
                campoOrdenacion = {
                    nombre: 'IMPORTE_ALQUILER',
                    descripcion: 'Alquiler',
                }
                break
            case 'Alquiler Desc':
                campoOrdenacion = {
                    nombre: 'IMPORTE_ALQUILER DESC',
                    descripcion: 'Alquiler Desc',
                }
                break
            case 'IBI Mes':
                campoOrdenacion = {
                    nombre: 'IBI',
                    descripcion: 'IBI Mes',
                }
                break
            case 'IBI Mes Desc':
                campoOrdenacion = {
                    nombre: 'IBI DESC',
                    descripcion: 'IBI Mes Desc',
                }
                break
            case 'Gts Com.':
                campoOrdenacion = {
                    nombre: 'GASTOS_COMUNIDAD',
                    descripcion: 'Gts Com.',
                }
                break
            case 'Gts Com. Desc':
                campoOrdenacion = {
                    nombre: 'GASTOS_COMUNIDAD DESC',
                    descripcion: 'Gts Com. Desc',
                }
                break
            case 'AA':
                campoOrdenacion = {
                    nombre: 'AIRE_ACONDICIONADO',
                    descripcion: 'AA',
                }
                break
            case 'AA Desc':
                campoOrdenacion = {
                    nombre: 'AIRE_ACONDICIONADO DESC',
                    descripcion: 'AA Desc',
                }
                break
            case 'Inst':
                campoOrdenacion = {
                    nombre: 'INSTALACIONES',
                    descripcion: 'Inst',
                }
                break
            case 'Inst Desc':
                campoOrdenacion = {
                    nombre: 'INSTALACIONES DESC',
                    descripcion: 'Inst Desc',
                }
                break
            case 'Tot Alq.':
                campoOrdenacion = {
                    nombre: 'TOTAL_ALQUILER',
                    descripcion: 'Tot Alq.',
                }
                break
            case 'Tot Alq. Desc':
                campoOrdenacion = {
                    nombre: 'TOTAL_ALQUILER DESC',
                    descripcion: 'Tot Alq. Desc',
                }
                break
            case 'Valoración':
                campoOrdenacion = {
                    nombre: 'VALORACION',
                    descripcion: 'Valoración',
                }
                break
            case 'Valoración Desc':
                campoOrdenacion = {
                    nombre: 'VALORACION DESC',
                    descripcion: 'Valoración Desc',
                }
                break
            case 'Hipoteca':
                campoOrdenacion = {
                    nombre: 'HIPOTECA',
                    descripcion: 'Hipoteca',
                }
                break
            case 'Hipoteca Desc':
                campoOrdenacion = {
                    nombre: 'HIPOTECA DESC',
                    descripcion: 'Hipoteca Desc',
                }
                break
            case 'Depósito':
                campoOrdenacion = {
                    nombre: 'DEPOSITO',
                    descripcion: 'Depósito',
                }
                break
            case 'Depósito Desc':
                campoOrdenacion = {
                    nombre: 'DEPOSITO DESC',
                    descripcion: 'Depósito Desc',
                }
                break
            case 'Alarma':
                campoOrdenacion = {
                    nombre: 'TIENE_ALARMA',
                    descripcion: 'Alarma',
                }
                break
            case 'Alarma Desc':
                campoOrdenacion = {
                    nombre: 'TIENE_ALARMA DESC',
                    descripcion: 'Alarma Desc',
                }
                break
            default:
                break
        }

        // console.log('filtroConsultaMM', filtroConsultaMM)

        actualizarVista(
            filtroConsultaMM,
            paginaConsultaMM,
            campoOrdenacion.nombre
        )
        dispatch(setOrdenacionConsultaMM(campoOrdenacion))
    }

    // Hook para la paginación
    const {
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
        // obtenerNumeroRegistros,
    } = useNavegacionConsultaMM({
        obtenerRegistros,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} />
            <div className='contenedor'>
                <h1 className='contenedor__h1'>Catálogo Comercial</h1>
                <div className='contenedor__main'>
                    <h2 className='contenedor__main__h2'>
                        Consulta de Existencias
                    </h2>
                    <FiltroConsultaObrasMM actualizarVista={actualizar} />
                    {lista && numeroRegistros !== 0 && (
                        <>
                            <Navegacion
                                campoOrdenacion={ordenacionConsultaMM}
                                ordenacion={listaOrdenacion}
                                paginaActual={paginaConsultaMM}
                                numeroPaginas={numeroPaginas}
                                numeroLineas={numeroLineas}
                                handleAnterior={handleAnterior}
                                handleSiguiente={handleSiguiente}
                                handlePrimero={handlePrimero}
                                handleUltimo={handleUltimo}
                                modificaNumeroLineas={modificaNumeroLineas}
                                modificaOrdenacion={modificaOrdenacion}
                            />
                            <ListaConsulta
                                lista={lista}
                                numeroRegistros={numeroRegistros}
                            />
                        </>
                    )}
                    {mensaje && mensaje !== '' && (
                        <p className='sin-registros'>{mensaje}</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Multimedia
