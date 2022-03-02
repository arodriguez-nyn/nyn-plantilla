import './styles.css'

const ListaConsulta = ({ lista, numeroRegistros }) => {
    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */

    //console.log('lista consulta', lista)

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            {lista && lista.length ? (
                <table className='tabla'>
                    <thead className='tabla__thead'>
                        <tr>
                            <th className='tabla__th'>Existencia</th>
                            <th className='tabla__th'>Literal</th>
                            <th className='tabla__th'>Hab</th>
                            <th className='tabla__th'>Ort</th>
                            <th className='tabla__th'>Sup Const</th>
                            <th className='tabla__th'>Elem Com</th>
                            <th className='tabla__th'>Terrazas</th>
                            <th className='tabla__th'>Patios</th>
                            <th className='tabla__th'>Varios</th>
                            <th className='tabla__th'>Sup Total</th>
                            <th className='tabla__th'>Alquiler</th>
                            <th className='tabla__th'>IBI mes</th>
                            <th className='tabla__th'>G Com</th>
                            <th className='tabla__th'>A.A.</th>
                            <th className='tabla__th'>Inst.</th>
                            <th className='tabla__th'>Tot.Alq.</th>
                            <th className='tabla__th'>Valoración</th>
                            <th className='tabla__th'>Hipoteca</th>
                            <th className='tabla__th'>Dep</th>
                            <th className='tabla__th'>Alarma</th>
                            <th className='tabla__th'>Cert</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(registro => (
                            <tr className='tabla__tr' key={registro.CODENT}>
                                <td
                                    className='tabla__td'
                                    // onClick={() => handleClick(registro)}
                                >
                                    {registro.CODENT}
                                </td>
                                <td className='tabla__td align-left'>
                                    {registro.LITENT}
                                </td>
                                <td className='tabla__td align-center'>
                                    {registro.NUMEST}
                                </td>
                                <td className='tabla__td align-center'>
                                    {registro.ORIENT}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.SUPERFICIE_CONSTRUIDA}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.SUP_ELEMENTOS_COMUNES}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.TERRAZAS}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.PATIO}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.VARIOS}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.SUPERFICIE_TOTAL}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.IMPORTE_ALQUILER}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.IBI}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.GASTOS_COMUNIDAD}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.AIRE_ACONDICIONADO}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.INSTALACIONES}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.TOTAL_ALQUILER}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.VALORACION}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.HIPOTECA}
                                </td>
                                <td className='tabla__td align-center'>
                                    {registro.DEPOSITO ? 'Sí' : 'No'}
                                </td>
                                <td className='tabla__td align-center'>
                                    {registro.ALARMA ? 'Sí' : 'No'}
                                </td>
                                <td className='tabla__td align-right'>
                                    {registro.CERTIFICADO}
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
            </footer>
        </>
    )
}

export default ListaConsulta
