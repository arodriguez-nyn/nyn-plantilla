import { progress } from '@progress/jsdo-core'
import { conectar } from './common'

export const obtenerRegistrosConsultaMM = filtro => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'consultaObraMM' })
                return jsdo.fill(filtro).then(
                    jsdo => {
                        return jsdo
                    },
                    error => {
                        return error
                    }
                )
            } else {
                return result
            }
        },
        error => error
    )
}
