import { useState, useEffect } from 'react'

const FormularioExjute = ({
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
        nombre: '',
    })
    const { nombre } = inputData

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

        if (!nombre || nombre === '') {
            return 'El nombre es obligatorio'
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
                    nombre: '',
                })
                setMensaje(null)
            }

            clear()
            return
        }

        setInputData({
            nombre: registroActual.NOMBRE,
        })
    }, [registroActual, setMensaje])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <form>
                <h2 className='contenedor__main__h2'>
                    Formulario Abogados Expedientes
                </h2>
                <div className='grid col-1'>
                    <label className='form__label' htmlFor='exjuab-nombre'>
                        Nombre del abogado
                    </label>
                    <input
                        className='form__input span-3'
                        name='nombre'
                        type='text'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <footer className='form__footer'>
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
                </footer>
            </form>
        </>
    )
}

export default FormularioExjute
