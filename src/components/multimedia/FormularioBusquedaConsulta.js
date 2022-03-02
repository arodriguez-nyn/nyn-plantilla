import { useState } from 'react'

const FiltrosBusquedaConsultaMultimedia = ({ setVista, obtenerRegistros }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [inputData, setInputData] = useState({
        obrgen: 0,
        nomdes: '',
    })
    const { obrgen, nomdes } = inputData

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    const handleClick = e => {
        e.preventDefault()

        // const message = validaRegistro()

        // if (message !== '') {
        //     setMensaje({
        //         tipo: 'error',
        //         texto: message,
        //     })
        //     return
        // }
        //setMensaje(null)
        setVista('Lista')
        obtenerRegistros('', inputData)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <form>
                <h2 className='contenedor__main__h2'>
                    Búscar Obras / Entidades
                </h2>
                <div className='grid col-3'>
                    <div>
                        <label className='form__label' htmlFor='mm-filtro-obra'>
                            Obra:
                        </label>
                        <input
                            id='mm-filtro-obra'
                            className='form__input'
                            name='obrgen'
                            value={obrgen}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='grid col-1'>
                    <div>
                        <label
                            className='form__label'
                            htmlFor='mm-filtro-calle'
                        >
                            Calle:
                        </label>
                        <input
                            id='mm-filtro-calle'
                            className='form__input '
                            name='nomdes'
                            value={nomdes}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <footer className='grid col-1'>
                    <div className='footer-end'>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleClick}
                        >
                            Aceptar
                        </button>
                    </div>
                </footer>
            </form>
        </>
    )
}

export default FiltrosBusquedaConsultaMultimedia
