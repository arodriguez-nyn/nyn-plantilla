import { useState, useEffect } from 'react'

// Dependencias
import NumberFormat from 'react-number-format'

import './styles.css'

const FormularioExpeju = ({
    registroActual,
    setVista,
    guardarRegistro,
    setMensaje,
    obtieneRegistroActual,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [inputData, setInputData] = useState({
        numexp: 0,
        codexp: '',
        obra: 0,
        numrec: '',
        nombreObra: '',
        codtem: '',
        descripcionTema: '',
        asunto: '',
        codabo: 0,
        nombreAbogado: '',
        respon: 0,
        nombreResponsable: '',
        observ: '',
        fectop: '',
        estado: '',
    })
    const {
        numexp,
        codexp,
        obra,
        numrec,
        nombreObra,
        codtem,
        // descripcionTema,
        asunto,
        codabo,
        nombreAbogado,
        respon,
        nombreResponsable,
        observ,
        fectop,
        estado,
    } = inputData

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    const validaRegistro = () => {
        if (!inputData) {
            return 'Error al guardar los datos'
        }

        if (!codtem || codtem === 0) {
            return 'El tema del expediente es obligatorio'
        }

        if (!asunto || asunto === 0) {
            return 'El asunto del expediente es obligatorio'
        }

        if (!codabo || codabo === 0) {
            return 'El abogado externo del expediente es obligatorio'
        }

        if (!estado || estado === '') {
            return 'El estado del expediente es obligatorio'
        }

        return ''
    }

    const handleGuardar = e => {
        e.preventDefault()

        const message = validaRegistro()

        if (message !== '') {
            setMensaje({
                tipo: 'error',
                texto: message,
            })
            return
        }
        setMensaje(null)
        guardarRegistro('', inputData)
    }

    const handleGuardarVolver = () => {
        const message = validaRegistro()

        if (message !== '') {
            setMensaje({
                tipo: 'error',
                texto: message,
            })
            return
        }

        setMensaje(null)
        guardarRegistro('Volver', inputData)
        setVista('Lista')
    }

    const handleVolver = () => {
        setMensaje(null)
        obtieneRegistroActual(null)
        setVista('Lista')
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!registroActual) {
            const clear = () => {
                setInputData({
                    numexp: 0,
                    obra: 0,
                    codexp: '',
                    numrec: '',
                    nombreObra: '',
                    codtem: 0,
                    descripcionTema: '',
                    asunto: '',
                    codabo: 0,
                    nombreAbogado: '',
                    respon: 0,
                    nombreResponsable: '',
                    observ: '',
                    fectop: '',
                    estado: '',
                })
                setMensaje(null)
            }

            clear()
            return
        }

        setInputData({
            numexp: registroActual.NUMEXP,
            codexp: registroActual.CODEXP,
            obra: registroActual.OBRA,
            numrec: registroActual.NUMREC,
            descripcionTema: registroActual.DESCRIPCION_TEMA,
            nombreObra: registroActual.NOMBRE_OBRA,
            codtem: registroActual.CODTEM,
            asunto: registroActual.ASUNTO,
            codabo: registroActual.CODABO,
            nombreAbogado: registroActual.NOMBRE_ABOGADO,
            respon: registroActual.RESPON,
            nombreResponsable: registroActual.NOMBRE_RESPONSABLE,
            observ: registroActual.OBSERV,
            fectop: registroActual.FECTOP ? registroActual.FECTOP : '',
            estado: registroActual.ESTADO,
        })
    }, [registroActual, setMensaje])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <form>
                <h2 className='contenedor__main__h2'>
                    Formulario Expediente Judicial
                </h2>
                <div className='grid col-2'>
                    <div className='grid col-3'>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-numexp'
                            >
                                Nº de Registro
                            </label>
                            <NumberFormat
                                id='expeju-numexp'
                                name='numexp'
                                value={numexp}
                                disabled
                                thousandSeparator={true}
                                allowNegative={false}
                                className='form__input align-right'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-codexp'
                            >
                                Nº de Expediente
                            </label>
                            <input
                                id='expeju-codexp'
                                className='form__input'
                                name='codexp'
                                value={codexp}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-numrec'
                            >
                                Nº Recurso
                            </label>
                            <input
                                d='expeju-numrec'
                                name='numrec'
                                value={numrec}
                                className='form__input'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-obra'
                            >
                                Nº de Obra
                            </label>
                            <div className='grid col-4'>
                                <div className='bloque-campo'>
                                    <NumberFormat
                                        id='expeju-obra'
                                        name='obra'
                                        value={obra}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        className='form__input align-right'
                                        // onBlur={handleBlurObras}
                                        onChange={handleChange}
                                    />
                                    <button
                                        className='icono-buscar'
                                        type='button'
                                        title='Seleccionar el número de obra'
                                        // onClick={() => setAyudaObra(true)}
                                    >
                                        <i className='fas fa-search fa-lg'></i>
                                    </button>
                                    <button
                                        className='icono-limpiar'
                                        type='button'
                                        // onClick={limpiarObra}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <input
                                    className='form__input span-3'
                                    name='nombreObra'
                                    value={nombreObra}
                                    type='text'
                                    readOnly
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid col-2'>
                    <div>
                        <label className='form__label' htmlFor='expeju-codtem'>
                            Tema
                            <span className='campo-obligatorio'>*</span>
                        </label>
                        <div className='grid col-4'>
                            <div
                                className='bloque-campo'
                                title='Campo obligatorio'
                            >
                                <NumberFormat
                                    id='expeju-codtem'
                                    name='codtem'
                                    value={codtem}
                                    className='form__input align-right'
                                    onChange={handleChange}
                                    // onBlur={handleBlurExjute}
                                />
                                <button
                                    className='icono-buscar'
                                    type='button'
                                    title='Seleccionar el código de tema'
                                    // onClick={() => setAyudaTema(true)}
                                >
                                    <i className='fas fa-search fa-lg'></i>
                                </button>
                                <button
                                    className='icono-limpiar'
                                    type='button'
                                    // onClick={limpiarCodtem}
                                >
                                    &times;
                                </button>
                            </div>
                            {/* <input
                                    className='form__input span-3'
                                    name='descripcionTema'
                                    type='text'
                                    readOnly
                                    value={descripcionTema}
                                    onChange={handleChange}
                                /> */}
                        </div>
                    </div>
                    <div>
                        <label className='form__label' htmlFor='expeju-asunto'>
                            Asunto
                            <span className='campo-obligatorio'>*</span>
                        </label>
                        <input
                            className='form__input'
                            id='expeju-asunto'
                            name='asunto'
                            type='text'
                            value={asunto}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='grid col-2'>
                    <div>
                        <label className='form__label' htmlFor='expeju-abogado'>
                            Abogado
                            <span className='campo-obligatorio'>*</span>
                        </label>
                        <div className='grid col-4'>
                            <div className='bloque-campo'>
                                <NumberFormat
                                    id='expeju-abogado'
                                    name='codabo'
                                    value={codabo}
                                    title='Campo obligatorio'
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    className='form__input align-right'
                                    onChange={handleChange}
                                    // onBlur={handleBlurExjuab}
                                />
                                <button
                                    className='icono-buscar'
                                    type='button'
                                    title='Seleccionar el código del abogado'
                                    // onClick={() => setAyudaAbogado(true)}
                                >
                                    <i className='fas fa-search fa-lg'></i>
                                </button>
                                <button
                                    className='icono-limpiar'
                                    type='button'
                                    // onClick={limpiarCodabo}
                                >
                                    &times;
                                </button>
                            </div>
                            <input
                                className='form__input span-3'
                                name='nombreAbogado'
                                type='text'
                                readOnly
                                value={nombreAbogado}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            className='form__label'
                            htmlFor='expeju-responsable'
                        >
                            Responsable
                        </label>
                        <div className='grid col-4'>
                            <div className='bloque-campo'>
                                <NumberFormat
                                    id='expeju-responsable'
                                    name='respon'
                                    value={respon}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    className='form__input align-right'
                                    onChange={handleChange}
                                    // onBlur={handleBlurExjure}
                                />
                                <button
                                    className='icono-buscar'
                                    type='button'
                                    title='Seleccionar el código del responsable'
                                    // onClick={() =>
                                    //     setAyudaResponsable(true)
                                    // }
                                >
                                    <i className='fas fa-search fa-lg'></i>
                                </button>
                                <button
                                    className='icono-limpiar'
                                    type='button'
                                    // onClick={limpiarRespon}
                                >
                                    &times;
                                </button>
                            </div>
                            <input
                                className='form__input span-3'
                                name='nombreResponsable'
                                type='text'
                                readOnly
                                value={nombreResponsable}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label className='form__label' htmlFor='expeju-observ'>
                        Comentarios
                    </label>
                    <textarea
                        id='expeju-observ'
                        name='observ'
                        value={observ}
                        className='editor'
                        rows='10'
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className='grid col-2'>
                    <div className='grid col-2'>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-fectop'
                            >
                                Fecha Tope
                            </label>
                            <input
                                className='form__input'
                                id='expeju-fectop'
                                name='fectop'
                                type='date'
                                value={fectop}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div></div>
                    </div>
                    <div className='grid col-1'>
                        <div>
                            <label
                                className='form__label'
                                htmlFor='expeju-estado'
                                name='estado'
                                value={estado}
                                onChange={handleChange}
                            >
                                Estado
                                <span className='campo-obligatorio'>*</span>
                            </label>
                            <select
                                className='selector'
                                name='estado'
                                value={estado}
                                onChange={handleChange}
                            >
                                <option></option>
                                <option>Analizando</option>
                                <option>Presentado</option>
                                <option>Pte. Borrador y/o Susp.</option>
                                <option>No presentar</option>
                                <option>Recibido borrador</option>
                                <option>Firmado</option>
                                <option>Efectuado</option>
                                <option>Constituida</option>
                                <option>Enviado burofax</option>
                                <option>Retirado contencioso</option>
                                <option>Sin plazo</option>
                                <option>Comparecido</option>
                                <option>Urgente firma</option>
                            </select>
                        </div>
                    </div>
                </div>
                <footer className='grid col-2'>
                    <div className='footer-start'>
                        <button
                            className='btn footer__btn'
                            width='120px'
                            type='button'
                            // onClick={handleClear}
                        >
                            Alta
                        </button>
                    </div>
                    <div className='footer-end'>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleGuardar}
                        >
                            Guardar
                        </button>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleGuardarVolver}
                        >
                            Guardar y Volver
                        </button>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleVolver}
                        >
                            Volver
                        </button>
                    </div>
                </footer>
            </form>
        </>
    )
}

export default FormularioExpeju
