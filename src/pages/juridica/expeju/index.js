import { useContext, useState, useEffect } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'
import XLSX from 'xlsx'

// Servicios
import {
    guardaExpeju,
    borrarExpeju,
    obtenerRegistrosExpeju,
} from 'services/expeju'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import {
    setRegistroActualExpeju,
    setOrdenacionExpeju,
} from 'redux/actions/juridica'
import AuthContext from 'context/AuthContext'

// Hooks
import useNavegacionExpeju from 'hooks/navegacion/useNavegacionExpeju'

// Componentes
import Alerta from 'components/Alerta'
import FiltroListaExpeju from 'components/filtros/FiltroListaExpeju'
import ModalLoading from 'components/modals/ModalLoading'
import FormularioExpeju from 'components/juridica/expedientes/Formulario'
import ListaExpeju from 'components/juridica/expedientes/Lista/index'
import Navegacion from 'components/Navegacion'
import { formateaFecha, autoFitCells } from 'helpers'
import ExpedientesJuridicaMenu from 'layouts/ExpedientesJuridicaMenu'

const Expeju = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const [listaExcel, setListaExcel] = useState([])
    const { usuario } = useContext(AuthContext)
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const {
        paginaExpeju,
        ordenacionExpeju,
        filtroExpeju,
        registroActualExpeju,
    } = useSelector(state => state.juridicaReducer)
    const { guardaUsuario } = useContext(AuthContext)
    const listaOrdenacion = [
        'Expediente',
        'Expediente Desc',
        'Tema',
        'Tema Desc',
        'Abogado',
        'Abogado Desc',
        'Responsable',
        'Responsable Desc',
        'Recurso',
        'Recurso Desc',
        'Estado',
        'Estado Desc',
        'Fecha Tope',
        'Fecha Tope Desc',
    ]
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

        guardaExpeju(registro, registroActualExpeju).then(respuesta => {
            /* Por defecto anulamos el state de las operaciones para que no salgan
               los mensajes en la pantalla de la lista
            */
            const { success } = respuesta

            accion !== 'Volver' && setLoading(false)

            if (success) {
                setRegistroActualExpeju(
                    respuesta.request.response.dsEXPEJU.ttEXPEJU[0]
                )
                accion !== 'Volver' &&
                    setMensaje({
                        tipo: 'exito',
                        texto: 'Registro guardado correctamente',
                    })
                accion === 'Volver' && history.push('/expeju')
            } else {
                const error = respuesta.request.response._errors[0]._errorMsg
                gestionErrores(error)
            }
        })
    }

    const borrarRegistro = registroActual => {
        borrarExpeju(registroActual)
            .then(() => {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Registro eliminado correctamente',
                })
                actualizarVista(
                    filtroExpeju,
                    paginaExpeju,
                    ordenacionExpeju.nombre
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

        obtenerRegistrosExpeju(filtro).then(
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
                    const lista = request.response.dsEXPEJU.ttEXPEJU
                    if (lista) {
                        const listaDefinitiva = lista.map(registro => {
                            // Mapeamos los valores calculados no obligatorios y fecha nulos a blanco
                            return {
                                ...registro,
                                FECTOP: registro.FECTOP ? registro.FECTOP : '',
                                NOMBRE_OBRA: registro.NOMBRE_OBRA || '',
                                NOMBRE_RESPONSABLE:
                                    registro.NOMBRE_RESPONSABLE || '',
                            }
                        })
                        setLista(listaDefinitiva)
                    } else {
                        setLista(null)
                    }
                }
                return jsdo
            },
            error => {
                setLoading(false)
                return error
            }
        )
    }

    const obtenerRegistrosExcel = (filtro = '') => {
        if (!usuario) return

        setListaExcel(null)
        setLoading(true)

        obtenerRegistrosExpeju(filtro).then(
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
                    const listaExcel = request.response.dsEXPEJU.ttEXPEJU
                    if (listaExcel) {
                        const listaDefinitiva = listaExcel.map(registro => {
                            // Mapeamos los valores calculados no obligatorios y fecha nulos a blanco
                            return {
                                ...registro,
                                FECTOP: registro.FECTOP ? registro.FECTOP : '',
                                NOMBRE_OBRA: registro.NOMBRE_OBRA || '',
                                NOMBRE_RESPONSABLE:
                                    registro.NOMBRE_RESPONSABLE || '',
                            }
                        })

                        setListaExcel(
                            listaDefinitiva.map(elemento => {
                                return {
                                    Tema: elemento.DESCRIPCION_TEMA,
                                    Asunto: elemento.ASUNTO,
                                    Comentarios: elemento.OBSERV,
                                    Abogado: elemento.NOMBRE_ABOGADO,
                                    Estado: elemento.ESTADO,
                                    'Fecha Tope': formateaFecha(
                                        elemento.FECTOP
                                    ),
                                }
                            })
                        )
                    }
                }
                return jsdo
            },
            error => {
                setLoading(false)
                return error
            }
        )
    }

    const obtieneRegistroActual = registro => {
        dispatch(setRegistroActualExpeju(registro))
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Expediente':
                campoOrdenacion = {
                    nombre: 'CODEXP',
                    descripcion: 'Expediente',
                }
                break
            case 'Expediente Desc':
                campoOrdenacion = {
                    nombre: 'CODEXP DESC',
                    descripcion: 'Expediente Desc',
                }
                break
            case 'Tema':
                campoOrdenacion = {
                    nombre: 'DESCRIPCION_TEMA',
                    descripcion: 'Tema',
                }
                break
            case 'Tema Desc':
                campoOrdenacion = {
                    nombre: 'DESCRIPCION_TEMA DESC',
                    descripcion: 'Tema Desc',
                }
                break
            case 'Abogado':
                campoOrdenacion = {
                    nombre: 'NOMBRE_ABOGADO',
                    descripcion: 'Abogado',
                }
                break
            case 'Abogado Desc':
                campoOrdenacion = {
                    nombre: 'NOMBRE_ABOGADO DESC',
                    descripcion: 'Abogado Desc',
                }
                break
            case 'Responsable':
                campoOrdenacion = {
                    nombre: 'NOMBRE_RESPONSABLE',
                    descripcion: 'Responsable',
                }
                break
            case 'Responsable Desc':
                campoOrdenacion = {
                    nombre: 'NOMBRE_RESPONSABLE DESC',
                    descripcion: 'Responsable Desc',
                }
                break
            case 'Recurso':
                campoOrdenacion = {
                    nombre: 'NUMREC',
                    descripcion: 'Recurso',
                }
                break
            case 'Recurso Desc':
                campoOrdenacion = {
                    nombre: 'NUMREC DESC',
                    descripcion: 'Recurso Desc',
                }
                break
            case 'Estado':
                campoOrdenacion = {
                    nombre: 'ESTADO',
                    descripcion: 'Estado',
                }
                break
            case 'Estado Desc':
                campoOrdenacion = {
                    nombre: 'ESTADO DESC',
                    descripcion: 'Estado Desc',
                }
                break
            case 'Fecha Tope':
                campoOrdenacion = {
                    nombre: 'FECTOP',
                    descripcion: 'Fecha Tope',
                }
                break
            case 'Fecha Tope Desc':
                campoOrdenacion = {
                    nombre: 'FECTOP DESC',
                    descripcion: 'Fecha Tope Desc',
                }
                break
            default:
                break
        }
        actualizarVista(filtroExpeju, paginaExpeju, campoOrdenacion.nombre)
        dispatch(setOrdenacionExpeju(campoOrdenacion))
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
    } = useNavegacionExpeju({
        obtenerRegistros,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        dispatch(setRegistroActualExpeju(null))
        actualizarVista(filtroExpeju, paginaExpeju, ordenacionExpeju.nombre)
    }, [filtroExpeju, paginaExpeju, ordenacionExpeju.nombre])

    useEffect(() => {
        const exportExcel = () => {
            const ws = XLSX.utils.json_to_sheet(listaExcel)
            const listaExcelLength = autoFitCells(listaExcel)

            var wscols = [
                { width: listaExcelLength[0] },
                { width: listaExcelLength[1] },
                { width: listaExcelLength[2] },
                { width: listaExcelLength[3] },
                { width: listaExcelLength[4] },
                { width: listaExcelLength[5] },
                { width: listaExcelLength[6] },
                { width: listaExcelLength[7] },
            ]

            ws['!cols'] = wscols

            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
            XLSX.writeFile(wb, 'Lista Expedientes.xlsx')
        }

        if (!listaExcel || listaExcel.length === 0) return

        exportExcel()
    }, [listaExcel])

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
                        <FormularioExpeju
                            registroActual={registroActualExpeju}
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
                        <FiltroListaExpeju actualizarVista={actualizarVista} />
                        {lista && (
                            <Navegacion
                                campoOrdenacion={ordenacionExpeju}
                                ordenacion={listaOrdenacion}
                                paginaActual={paginaExpeju}
                                numeroPaginas={numeroPaginas}
                                numeroLineas={numeroLineas}
                                handleAnterior={handleAnterior}
                                handleSiguiente={handleSiguiente}
                                handlePrimero={handlePrimero}
                                handleUltimo={handleUltimo}
                                modificaNumeroLineas={modificaNumeroLineas}
                                modificaOrdenacion={modificaOrdenacion}
                            />
                        )}

                        <ListaExpeju
                            lista={lista}
                            numeroRegistros={numeroRegistros}
                            setVista={setVista}
                            borrarRegistro={borrarRegistro}
                            obtieneRegistroActual={obtieneRegistroActual}
                            obtenerRegistrosExcel={obtenerRegistrosExcel}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Expeju
