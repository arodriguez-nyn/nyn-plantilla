import { useContext, useState, useEffect } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'

// Servicios
import {
    guardaExjute,
    borrarExjute,
    obtenerRegistrosExjute,
} from 'services/exjute'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import {
    setRegistroActualExjute,
    setOrdenacionExjute,
} from 'redux/actions/juridica'
import AuthContext from 'context/AuthContext'

// Hooks
import useNavegacionExjute from 'hooks/navegacion/useNavegacionExjute'

// Componentes
import Alerta from 'components/Alerta'
import FiltroListaExjute from 'components/filtros/FiltroListaExjute'
import ModalLoading from 'components/modals/ModalLoading'
import FormularioExjute from 'components/auxiliares/juridica/FormularioExjute'
import ListaExjute from 'components/auxiliares/juridica/ListaExjute'
import Navegacion from 'components/Navegacion'
import ExpedientesJuridicaMenu from 'layouts/ExpedientesJuridicaMenu'

const Exjute = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const { usuario } = useContext(AuthContext)
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const {
        paginaExjute,
        ordenacionExjute,
        filtroExjute,
        registroActualExjute,
    } = useSelector(state => state.juridicaReducer)
    const { guardaUsuario } = useContext(AuthContext)
    const listaOrdenacion = ['Tema', 'Tema Desc']
    const [vista, setVista] = useState('Lista')

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const gestionErrores = mensaje => {
        const inicio = mensaje.indexOf(':') + 2
        const fin = mensaje.indexOf('(') - 1
        setMensaje({
            tipo: 'error',
            texto: mensaje.substring(inicio, fin),
        })
    }

    const guardarRegistro = (
        accion = '',
        registro = { codtem: 0, descri: '' }
    ) => {
        accion !== 'Volver' && setLoading(true)

        guardaExjute(registro, registroActualExjute).then(respuesta => {
            accion !== 'Volver' && setLoading(false)

            const { success } = respuesta

            if (success) {
                dispatch(
                    setRegistroActualExjute(
                        respuesta.request.response.dsEXJUTE.ttEXJUTE[0]
                    )
                )

                actualizarVista(
                    filtroExjute,
                    paginaExjute,
                    ordenacionExjute.nombre
                )
                accion !== 'Volver'
                    ? setMensaje({
                          tipo: 'exito',
                          texto: 'Registro guardado correctamente',
                      })
                    : setMensaje(null)
            } else {
                const error = respuesta.request.response._errors[0]._errorMsg
                gestionErrores(error)
            }
        })
    }

    const borrarRegistro = registroActual => {
        borrarExjute(registroActual)
            .then(() => {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Registro eliminado correctamente',
                })
                actualizarVista(
                    filtroExjute,
                    paginaExjute,
                    ordenacionExjute.nombre
                )
            })
            .catch(error => {
                console.log(error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al eliminar el registro',
                })
            })
    }

    const obtenerRegistros = (filtro = '') => {
        if (!usuario) return

        setLista(null)
        setLoading(true)

        obtenerRegistrosExjute(filtro).then(
            jsdo => {
                setLoading(false)
                if (!jsdo) {
                    // Sesión caducada
                    guardaUsuario(null)
                    history.push('/')
                    return
                }

                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsEXJUTE.ttEXJUTE

                    if (lista) {
                        setLista(lista)
                    } else {
                        setLista(null)
                    }
                }
                return jsdo
            },
            error => {
                setLoading(false)
                console.log('error ListaExjute', error)
                return error
            }
        )
    }

    const obtieneRegistroActual = registro => {
        dispatch(setRegistroActualExjute(registro))
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Tema':
                campoOrdenacion = {
                    nombre: 'DESCRI',
                    descripcion: 'Tema',
                }
                break
            case 'Tema Desc':
                campoOrdenacion = {
                    nombre: 'DESCRI DESC',
                    descripcion: 'Tema Desc',
                }
                break
            default:
                break
        }
        actualizarVista(filtroExjute, paginaExjute, campoOrdenacion.nombre)
        dispatch(setOrdenacionExjute(campoOrdenacion))
    }

    // Hook para la paginación
    const {
        numeroPaginas,
        numeroRegistros,
        numeroLineas,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        modificaNumeroLineas,
        actualizarVista,
    } = useNavegacionExjute({
        obtenerRegistros,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        dispatch(setRegistroActualExjute(null))
        actualizarVista(filtroExjute, paginaExjute, ordenacionExjute.nombre)
    }, [filtroExjute, paginaExjute, ordenacionExjute.nombre])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ExpedientesJuridicaMenu />
            <ModalLoading mostrarModal={loading} />
            <div className='contenedor'>
                <h1 className='contenedor__h1'>
                    Mantenimiento de Temas de Expedientes Judiciales
                </h1>
                {mensaje && (
                    <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />
                )}

                {vista === 'Formulario' ? (
                    <div className='contenedor__main'>
                        <FormularioExjute
                            registroActual={registroActualExjute}
                            setVista={setVista}
                            guardarRegistro={guardarRegistro}
                            setMensaje={setMensaje}
                            obtieneRegistroActual={obtieneRegistroActual}
                        />
                    </div>
                ) : (
                    <div className='contenedor__main'>
                        <h2 className='contenedor__main__h2'>
                            Lista de Temas de Expedientes
                        </h2>
                        <FiltroListaExjute actualizarVista={actualizarVista} />
                        <Navegacion
                            campoOrdenacion={ordenacionExjute}
                            ordenacion={listaOrdenacion}
                            paginaActual={paginaExjute}
                            numeroPaginas={numeroPaginas}
                            numeroLineas={numeroLineas}
                            handleAnterior={handleAnterior}
                            handleSiguiente={handleSiguiente}
                            handlePrimero={handlePrimero}
                            handleUltimo={handleUltimo}
                            modificaNumeroLineas={modificaNumeroLineas}
                            modificaOrdenacion={modificaOrdenacion}
                        />

                        <ListaExjute
                            lista={lista}
                            numeroRegistros={numeroRegistros}
                            setVista={setVista}
                            borrarRegistro={borrarRegistro}
                            obtieneRegistroActual={obtieneRegistroActual}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Exjute
