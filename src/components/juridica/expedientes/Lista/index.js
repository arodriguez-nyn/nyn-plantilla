import { useState } from 'react'

// Componentes
import ModalConfirmacion from 'components/modals/ModalConfirmacion'

import { formateaFecha } from 'helpers'

const ListaExpeju = ({
    lista,
    setVista,
    numeroRegistros,
    borrarRegistro,
    obtieneRegistroActual,
    obtenerRegistrosExcel,
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

    const handleClickExport = () => {
        obtenerRegistrosExcel()
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
                            <th className='tabla__th'>Tema</th>
                            <th className='tabla__th'>Expediente</th>
                            <th className='tabla__th'>Abogado</th>
                            <th className='tabla__th'>Responsable</th>
                            <th className='tabla__th'>Recurso</th>
                            <th className='tabla__th'>Estado</th>
                            <th className='tabla__th'>Fecha Tope</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(registro => (
                            <tr className='tabla__tr' key={registro.NUMEXP}>
                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.DESCRIPCION_TEMA}
                                </td>
                                <td
                                    className='tabla__td align-right'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.CODEXP}
                                </td>

                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.NOMBRE_ABOGADO}
                                </td>
                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.NOMBRE_RESPONSABLE}
                                </td>
                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.NUMREC}
                                </td>
                                <td
                                    className='tabla__td align-center'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.ESTADO}
                                </td>
                                <td
                                    className='tabla__td align-center'
                                    onClick={() => handleClick(registro)}
                                >
                                    {formateaFecha(registro.FECTOP)}
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
                <div className='buttons-footer'>
                    <button
                        className='btn footer__btn'
                        type='button'
                        onClick={handleAlta}
                    >
                        Alta
                    </button>
                    {lista && lista.length > 0 && (
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleClickExport}
                        >
                            Excel
                        </button>
                    )}
                </div>
            </footer>
        </>
    )
}

export default ListaExpeju
