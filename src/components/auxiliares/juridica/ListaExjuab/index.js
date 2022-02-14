import { useState } from 'react'

// Componentes
import ModalConfirmacion from 'components/modals/ModalConfirmacion'

const ListaExjuab = ({
    lista,
    setVista,
    numeroRegistros,
    borrarRegistro,
    obtieneRegistroActual,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [confirmacion, setConfirmacion] = useState(false)
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClick = registro => {
        obtieneRegistroActual(registro)
        setVista('Formulario')
    }

    const handleDelete = registro => {
        setRegistroSeleccionado(registro)
        setConfirmacion(true)
    }

    const handleAceptarConfirmacion = () => {
        setConfirmacion(false)
        borrarRegistro(registroSeleccionado)
    }

    const handleCancelarConfirmacion = () => {
        setRegistroSeleccionado(null)
        setConfirmacion(false)
    }

    const handleAlta = () => {
        setRegistroSeleccionado(null)
        setVista('Formulario')
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalConfirmacion
                mostrarModal={confirmacion}
                handleAceptarConfirmacion={handleAceptarConfirmacion}
                handleCancelarConfirmacion={handleCancelarConfirmacion}
            />
            {lista && lista.length ? (
                <table className='tabla'>
                    <thead className='tabla__thead'>
                        <tr>
                            <th className='tabla__th'>Nombre del Abogado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista &&
                            lista.length > 0 &&
                            lista.map(registro => (
                                <tr className='tabla__tr' key={registro.CODABO}>
                                    <td
                                        className='tabla__td'
                                        onClick={() => handleClick(registro)}
                                    >
                                        {registro.NOMBRE}
                                    </td>
                                    <td
                                        className='tabla__td table__del-th'
                                        onClick={() => handleDelete(registro)}
                                        title='Eliminar registro'
                                    >
                                        <i className='far fa-trash-alt'></i>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            ) : (
                <p className='sin-registros'>No hay registros para mostrar</p>
            )}
            <footer className='contenedor__footer'>
                <div>
                    {numeroRegistros !== 0 && (
                        <span>{`${numeroRegistros} ${
                            numeroRegistros > 0 ? 'registros' : 'registro'
                        }`}</span>
                    )}
                </div>
                <button
                    className='btn footer__btn'
                    width='120px'
                    type='button'
                    onClick={handleAlta}
                >
                    Alta
                </button>
            </footer>
        </>
    )
}

export default ListaExjuab
